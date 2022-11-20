import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";

const MobileEnterButton = styled.button.attrs({'type': 'button'})`
    width: 80px;
    height: 32px;
    margin: 20px auto auto;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    font-size: 14px;
    color: #fff;
    background-color: #333;
    box-shadow: 0px 2px 4px 4px rgba(0,0,0,0.1);
    transition: .3s ease-in-out;
`

function TodayList(props) {

    let [todayListFade,setTodayListFade] = useState('');

    const inputFocusRef = useRef();
    
    const handleInputClick = () => {
        props.setIsInputClicked('mobileTransition');
    }

    useEffect(() => {
        let timeout = setTimeout(() => {
            setTodayListFade('active');
            return (() => {
                clearTimeout(timeout);
            })
        }, 500);
    },[todayListFade]);

    useEffect(() => {
        document.addEventListener('mousedown',handleClickOutside);
        
        return () => {
            document.removeEventListener('mousedown',handleClickOutside);
        }
    },[inputFocusRef]);

    const handleClickOutside = e => {
        if(inputFocusRef.current && !inputFocusRef.current.contains(e.target)){
            props.setIsInputClicked('');
            props.setIsNone('');
        }
    }

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

    const mobileEnterPress = () => {
        if(props.todayStorage !== ''){
            props.setTodayList(true);
            props.setTodayIsPressed(true);
            props.setIsNone('');
        }

        if(props.todayStorage === ''){
            alert('할 일을 입력해주세요');
        }
    }

    return ( 
        <>
            <div className={`todayWrap ${todayListFade} ${props.isInputClicked}`}>
                <p className="txt">오늘 할 일은 무엇인가요?</p>
                <input type="text" className="center" autoComplete="off" spellCheck="false" onChange={currentValue}
                onKeyPress={enterPress} value={props.currentInput} onFocus={handleInputClick} ref={inputFocusRef}/>
                {
                    props.m550 &&  props.isInputClicked === 'mobileTransition' &&
                    
                    <MobileEnterButton onTouchStart={mobileEnterPress}>입력</MobileEnterButton>
                }
            </div>
        </>
     );
}

export default TodayList;