import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil , faXmark } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const MenuList = styled.ul`
    flex: 1;
    padding: 5px 0;
`

const MenuItem = styled.li`
    display: flex;
    align-items: center;
    column-gap: 5px;
    height: 28px;
    cursor: pointer;
    &:hover{
        background-color: rgba(255,255,255,0.1);
    }
`

const MenuTxt = styled.span`
    color: #fff;
    font-size: 14px;
    cursor: pointer;
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
                </MenuList>
            </div>
        </>
     );
}

export default TodayTooltip;