import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck,faEllipsis  } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useState, useEffect } from "react";
import useLocalStorage from "use-local-storage";

const MyTodayList = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-direction: column;
    flex: 0.6;
`

const TodayValue = styled.span`
    color: #fff;
    font-size: 36px;
`

const Icon = styled.button.attrs({type: 'button'})`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: ${props => props.display};
    &.lt{left: -15px;}
    &.rt{right: -15px;}
    color: ${props => props.svgColor};
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
        .ico.hv{display: block;}
        .unCheckBox{display: block;}
    }
    &.checked{
        .todayValue{text-decoration: line-through; color: #ddd;}
        .activeCheckBox{display: block;}
    }
`

function TodayActive(props) {

    let [isChecked,setIsChecked] = useLocalStorage('isChecked',false);
    let [txtIsChecked,setTxtIsChecked] = useState('');

    const handleChecked = () => {
        setIsChecked(true);
    }

    const handleUnChecked = () => {
        setIsChecked(false);
    }

    useEffect(() => {
        if(isChecked){
            setTxtIsChecked('checked');
        } else {
            setTxtIsChecked('');
        }
    },[isChecked])

    return ( 
        <>
            <MyTodayList>
                <TodayTxt>오늘 할 일</TodayTxt>
                <IconContainer className={txtIsChecked}>
                    {isChecked ? 
                    <Icon display="flex" className="lt" svgColor="#fff" onClick={handleUnChecked}>
                        <FontAwesomeIcon icon={faSquareCheck} className="ico svg hv activeCheckBox"/>
                    </Icon> 
                        : 
                    <IconDefault display="none" className="lt unCheckBox" bdColor="#fff" onClick={handleChecked}/>}

                    <TodayValue className="todayValue">{props.todayStorage}</TodayValue>
                    <Icon display="flex" className="rt" svgColor="#fff">  
                        <FontAwesomeIcon icon={faEllipsis} className="ico svg hv"/>
                    </Icon>
                </IconContainer>
            </MyTodayList>  
        </>
     );
}

export default TodayActive;