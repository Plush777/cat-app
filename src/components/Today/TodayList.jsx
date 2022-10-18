import { useEffect } from "react";
import { useState } from "react";

function TodayList(props) {

    let [todayListFade,setTodayListFade] = useState('');
    

    useEffect(() => {
        let timeout = setTimeout(() => {
            setTodayListFade('active');
            return (() => {
                clearTimeout(timeout);
            })
        }, 500);
    },[todayListFade]);

    const currentValue = e => {
        props.setTodayStorage(e.target.value);
        props.setCurrentInput(e.target.value)
    }

    const enterPress = e => {
        if(e.key === 'Enter' && props.todayStorage !== ''){
            props.setTodayList(true);
            props.setTodayIsPressed(true);
        }

        if(e.key === 'Enter' && props.todayStorage === ''){
            alert('할 일을 입력해주세요');
        }
    }

    return ( 
        <>
            <div className={`todayWrap ${todayListFade}`}>
                <p className="txt">오늘 할 일은 무엇인가요?</p>
                <input type="text" className="center" autoComplete="off" spellCheck="false" onChange={currentValue}
                onKeyPress={enterPress} value={props.currentInput}/>
            </div>
        </>
     );
}

export default TodayList;