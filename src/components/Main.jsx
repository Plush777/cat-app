import { useEffect, useState } from "react";

function Main(props) {

    const [time,setTime] = useState();
    const [timerFade,setTimerFade] = useState('');

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
                return (() => {
                    clearTimeout(timeout);
                })
            }, 500);
        }
    },[timerFade]);

    return ( 
        <>
            <div className="center">
                {
                    props.yourName && <div className={'timerWrap ' + timerFade}>
                                        <span className="timer">{time}</span>
                                    </div>
                }
                <div className="messageWrap">
                    <span className="message">{props.userName}</span>
                    <span className="userName"></span>
                </div>
            </div>
        </>
     );
}

export default Main;