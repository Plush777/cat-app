import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck,faEllipsis  } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useState, useEffect } from "react";
import TodayTooltip from "./TodayTooltip";
import { useRef } from "react";

const MyTodayList = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-direction: column;
    flex: 0.6;
`

const TodayValue = styled.span`
    display: block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    max-width: 95%;
    margin: 0 12px;
    color: #fff;
    font-size: 36px;
`

const Icon = styled.button.attrs({type: 'button'})`
    visibility: ${props => props.visibility};
    color: ${props => props.svgColor};
    &.rt{
        &.block .ico{visibility: visible;}
    }
    
`

const IconDefault = styled(Icon)`
    width: 24px;
    height: 24px;
    border-radius: 4px;
    border: 2px solid ${props => props.bdColor};
`

const TodayTxt = styled.h3`
    font-size: 21px;
    color: #fff;
`

const IconContainer = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5px;

    &:hover{
        .ico.hv{visibility: visible;}
        .unCheckBox{visibility: visible;}
    }
    &.checked{
        .todayValue{text-decoration: line-through; color: #ddd;}
        .activeCheckBox{visibility: visible;}
    }
`

function TodayActive(props) {

    let [isChecked,setIsChecked] = useState(false);
    let [txtIsChecked,setTxtIsChecked] = useState('');
    let [toolTip,setToolTip] = useState(false);
    let [toolTipClass,setToolTipClass] = useState('');
    let [isIconActive,setIsIconActive] = useState('');

    const handleChecked = () => {
        setIsChecked(true);
    }

    const handleUnChecked = () => {
        setIsChecked(false);
    }

    const handleTooltip = () => {
        setToolTip(!toolTip);
    }

    const ref = useRef();

    useEffect(() => {
        if(isChecked){
            setTxtIsChecked('checked');
        } else {
            setTxtIsChecked('');
        }
    },[isChecked])

    useEffect(() => {
        if(toolTip){
            setToolTipClass('active');
            setIsIconActive('block');
        } else {
            setToolTipClass('');
            setIsIconActive('');
        }
    },[toolTip])

    useEffect(() => {
        document.addEventListener('mousedown',handleClickOutside);
        
        return () => {
            document.removeEventListener('mousedown',handleClickOutside);
        }
    });

    const handleClickOutside = e => {
        if(ref.current && !ref.current.contains(e.target)){
            setToolTip(false);
        }
    }

    return ( 
        <>
            <MyTodayList>
                <TodayTxt>오늘 할 일</TodayTxt>
                <IconContainer className={txtIsChecked}>
                    {isChecked ? 
                    <Icon visibility="visible" className="lt" svgColor="#fff" onClick={handleUnChecked}>
                        <FontAwesomeIcon icon={faSquareCheck} className="ico svg hv activeCheckBox"/>
                    </Icon> 
                        : 
                    <IconDefault visibility="hidden" className="lt unCheckBox" bdColor="#fff" onClick={handleChecked}/>}

                    <TodayValue className="todayValue">{props.todayStorage}</TodayValue>
                    <Icon className={`rt ${isIconActive}`} svgColor="#fff" onClick={handleTooltip} ref={ref}>  
                        <FontAwesomeIcon icon={faEllipsis} className="ico svg hv"/>
                        <TodayTooltip toolTipClass={toolTipClass} todayIsPressed={props.todayIsPressed} 
                        setTodayIsPressed={props.setTodayIsPressed} isChecked={isChecked} setIsChecked={setIsChecked}
                        todayList={props.todayList} setTodayList={props.setTodayList} txtIsChecked={txtIsChecked} 
                        setTxtIsChecked={setTxtIsChecked} todayStorage={props.todayStorage} 
                        setTodayStorage={props.setTodayStorage}/>
                    </Icon>
                </IconContainer>
            </MyTodayList>  
        </>
     );
}

export default TodayActive;