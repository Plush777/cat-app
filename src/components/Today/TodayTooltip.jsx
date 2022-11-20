import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil , faXmark } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const MenuList = styled.ul`
    flex: 1;
    padding: 5px 0;

    @media screen and (max-width: 550px){
        padding: 10px 0;
    }
`

const MenuItem = styled.li`
    display: flex;
    align-items: center;
    column-gap: 5px;
    height: 28px;
    cursor: pointer;

    @media screen and (max-width: 550px){
        &:nth-of-type(2){margin-bottom: 10px;}
    }
    
    @media (hover: hover) {
        &:hover{
            background-color: rgba(255,255,255,0.1);
        }
    }
`

const MenuTxt = styled.span`
    color: #fff;
    font-size: 14px;
    cursor: pointer;
`

const MobileToolTipCloseButton = styled.div.attrs({role: 'button', tabIndex: '0'})`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 25px;
    border-radius: 10px;
    font-size: 14px;
    margin: 0 15px;
    color: #fff;
    background-color: rgba(43,43,43,0.8);

    &:before{
        content: '';
        position: absolute;
        bottom: 114px;
        width: 100%;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.6);
        z-index: -1;
    }
`

function TodayTooltip(props) {

    const handleClear = () => {
        props.setTodayIsPressed(false);
        props.setTodayList(false);
        props.setTodayStorage('');
        props.setCurrentInput('');
    }

    const handleEdit = () => {
        props.setTodayIsPressed(false);
        props.setTodayList(false);
        props.setCurrentInput(JSON.parse(localStorage.getItem('todayList')));
    }

    const handleTooltipClose = () => {
        props.setToolTipClass('');
    }

    return ( 
        <>
            <div className={`toolTip today arrowUp ${props.toolTipClass}`}>
                <MenuList>
                    <MenuItem onClick={handleEdit}>
                        <FontAwesomeIcon className="ico pencil" icon={faPencil} />
                        <MenuTxt>Edit</MenuTxt>
                    </MenuItem>
                    <MenuItem onClick={handleClear}>
                        <FontAwesomeIcon className="ico xMark" icon={faXmark} />
                        <MenuTxt>clear</MenuTxt>
                    </MenuItem>
                    {
                        props.m550 &&

                        <MenuItem onClick={handleTooltipClose}>
                            <MobileToolTipCloseButton>Close</MobileToolTipCloseButton>
                        </MenuItem>
                    }
                </MenuList>
            </div>
        </>
     );
}

export default TodayTooltip;