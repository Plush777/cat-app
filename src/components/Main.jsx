import { useEffect, useState } from "react";
import Quotes from "./Quotes";
import SearchForm from "./Search/SearchForm";
import TodayActive from "./Today/TodayActive";
import TodayList from "./Today/TodayList";
import Todo from "./Todo/Todo";
import Weather from "./Weather";

function Main(props) {

    const [time,setTime] = useState();
    const [timerFade,setTimerFade] = useState('');
    const [messageFade ,setMessageFade] = useState('');
    let [currentInput,setCurrentInput] = useState('');
    let [isInputClicked,setIsInputClicked] = useState(''); //모바일 TodayList input focus 시 mobileTransition 클래스 추가
    let [isNone,setIsNone] = useState(''); //모바일 TodayList input focus 시 centerContainer에 none 클래스 추가

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

    useEffect(() => {
        if(isInputClicked){
            setIsNone('none');
        } else {
            setIsNone('');
        }
    },[isInputClicked]);

    return ( 
        <>
            <div className="center">
               
                <div className={`centerContainer ${isNone}`}>
                    {
                        props.yourName && 
                        <div className={'timerWrap ' + timerFade}>
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
                todayList={props.todayList} setTodayList={props.setTodayList} currentInput={currentInput} 
                setCurrentInput={setCurrentInput} m550={props.m550} setM550={props.setM550}/>}

                {!props.todayList && <TodayList todayStorage={props.todayStorage} setTodayStorage={props.setTodayStorage} 
                todayList={props.todayList} setTodayList={props.setTodayList} setTodayIsPressed={props.setTodayIsPressed}
                currentInput={currentInput} setCurrentInput={setCurrentInput} isInputClicked={isInputClicked}
                setIsInputClicked={setIsInputClicked} setIsNone={setIsNone} m550={props.m550} setM550={props.setM550}/>}

                <SearchForm/>
                
                <Quotes/>

                <Todo/>
            </div>
        </>
     );
}

export default Main;