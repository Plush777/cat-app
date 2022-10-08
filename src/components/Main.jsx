import { useEffect, useState } from "react";
import Quotes from "./Quotes";
import TodayActive from "./TodayActive";
import TodayList from "./TodayList";
import Weather from "./Weather";

function Main(props) {

    const [time,setTime] = useState();
    const [timerFade,setTimerFade] = useState('');
    const [messageFade ,setMessageFade] = useState('');
    

    const getTime = () => {
        const date = new Date();
        const hours = String(date.getHours()).padStart(2,'0');
        const minutes = String(date.getMinutes()).padStart(2,'0');
        setTime(hours + ':' + minutes);
    }

    useEffect(() => {
        setInterval(getTime,1000);
        return(() => clearInterval(getTime));
    },[]);

    useEffect(() => {
        if(props.yourName === true){
            let timeout = setTimeout(() => {
                setTimerFade('active');
                setMessageFade('active');
                return (() => {
                    clearTimeout(timeout);
                })
            }, 500);
        }
    },[timerFade,messageFade,props.yourName]);

    useEffect(() => {
        if(props.todayStorage === ''){
            props.setTodayIsPressed(false);
        } 
    },[props.todayStorage,props,props.setTodayIsPressed]);

    console.log(props.todayIsPressed);

    useEffect(() => {
        if(!props.todayIsPressed){
            props.setTodayList(false);
        } else {
            props.setTodayList(true);
        }
    },[props,props.todayIsPressed,props.setTodayList]);

    console.log(props.todayList);
    console.log(props.todayIsPressed);

    return ( 
        <>
            <div className="center">
               
                <div className="centerContainer">
                    {
                        props.yourName && <div className={'timerWrap ' + timerFade}>
                                            <span className="timer">{time}</span>
                                        </div>
                    }
                    <div className={'messageWrap ' + messageFade}>
                        <span className="userName">{props.userName}</span>
                        <span className="defaultMsg">님, 반가워요!</span>
                    </div>
                </div>
                
                <Weather/>

                {props.todayList && <TodayActive todayStorage={props.todayStorage} setTodayStorage={props.setTodayStorage} 
                todayIsPressed={props.todayIsPressed}setTodayIsPressed={props.setTodayIsPressed} 
                todayList={props.todayList} setTodayList={props.setTodayList}/>}

                {!props.todayList && <TodayList todayStorage={props.todayStorage} setTodayStorage={props.setTodayStorage} 
                todayList={props.todayList} setTodayList={props.setTodayList} setTodayIsPressed={props.setTodayIsPressed}/>}

                <Quotes/>
            </div>
        </>
     );
}

export default Main;