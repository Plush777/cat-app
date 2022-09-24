import { useEffect, useState } from "react";
import Quotes from "./Quotes";
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

    return ( 
        <>
            <div className="center">
                {
                    props.yourName && <div className={'timerWrap ' + timerFade}>
                                        <span className="timer">{time}</span>
                                    </div>
                }
                <div className={'messageWrap ' + messageFade}>
                    <span className="userName">{props.userName}</span>
                    <span className="defaultMsg">님, 반가워요!</span>
                </div>
                
                <Weather/>

                <Quotes/>
            </div>
        </>
     );
}

export default Main;