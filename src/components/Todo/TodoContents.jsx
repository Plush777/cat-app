import { useCallback, useEffect, useMemo } from "react";
import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil , faXmark } from "@fortawesome/free-solid-svg-icons";

const TodoContentsDiv = styled.div`
    padding: 7px 16px 0 16px;
`;

const TodoContentsList = styled.ul`
    display: flex;
    flex-direction: column;
`

const TodoContentsItem = styled.li`
    display: flex;
    align-items: center;

    &+&{
        padding-top: 5px;
    }
`

const TodoContentsItemCheck = styled.input.attrs({'type': 'checkbox'})`
    margin: 0 5px 0 0;
`

const TodoItemName = styled.label`
    max-width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 16px;
    /* checkedArr에 list 값이 존재하면 #777 , 존재하지않으면 #fff를 적용합니다. */
    color: ${props => props.checkedArr.includes(props.index) ? '#777' : '#fff'};
    text-decoration: ${props => props.checkedArr.includes(props.index) ? 'line-through' : 'none'};
`

const TodoItemButtonContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    column-gap: 16px;
`

const TodoItemDelete = styled.button.attrs({type: 'button'})`
    color: #fff;
    transition: .5s ease-in-out;
    opacity: 0;
    visibility: hidden;

    ${TodoContentsItem}:hover &{
        opacity: 1;
        visibility: visible;
    }
`

const TodoItemModify = styled(TodoItemDelete)`

`

function TodoContents(props) {

    let [itemChecked,setItemChecked] = useState(false);
    let [trigger,setTrigger] = useState(false);

    const handleItemCheck = e => {
        /* 체크하면 true , 체크 안하면 false로 되야하는데
        e.target.checked는 왜인지 모르겠지만 예상했던거랑 반대로 동작해서 !를 붙였습니다.*/
        setItemChecked(!e.target.checked);
    }

    /* 
        첫번째 파라미터는 사용자가 눌렀을 때 체크박스가 checked인지 아닌지 판별합니다.
        두번째 파라미터는 체크박스가 checked 되면 현재 체크된 체크박스의 index를 전달합니다.

        => 현재 누른 체크박스가 checked 되면 checkedArr에 index값을 추가합니다.
        (객체나 배열은 불변성을 지키면서 값을 업데이트 해야하기 때문에, spread [...] 를 써서
        기존 배열을 복사하여 새로운 배열을 만든 후 index 값을 추가했습니다.)

        => checked가 되지 않은 경우 checkedArr에서 index값을 제거합니다. 


        checkedArr.includes(index) ? true : false
        => checkedArr에 index값이 존재하면 true, 존재하지 않으면 false를 반환합니다.
        => checked 값을 정해주지 않으면 디폴트값이 false이기 때문에,
        checked 유지가 되지않습니다.
    */
    const checkedItemHandler = useCallback((checked,index) => {
        if(checked){
            props.setCheckedArr([
                ...props.checkedArr,
                index,
            ]);
        } else {
            props.setCheckedArr(props.checkedArr.filter(el => el !== index));
        }
    },[props])

    // let newTodoData = useMemo(() => {
    //     return [...props.todoData];
    // },[props.todoData])

    const todoItemDelete = el => {
        props.setTodoData(props.todoData.filter(({index}) => index !== el))
        // setTrigger(!trigger);
        // for(let i = 0; i < props.todoData.length; i++){
        //     newTodoData[i].index = i;
        // }

        if(props.todoData.index === el){
            alert('삭제되었습니다.');
        }

        if(props.todoData.length === 1){
            props.setAddTodoEvent(false);
            props.setChangeAdd(false);
            props.setChangeAddButton(false);
        }
    }

    const todoItemCheckedDelete = () => {
        let itemChkArr = [...props.checkedArr];
        itemChkArr.shift();
        props.setCheckedArr(itemChkArr);
    }

    return (  
        <>
            <TodoContentsDiv>
                <TodoContentsList>
                    {
                        props.todoData.map(({name,index}) => {
                            return (
                                <TodoContentsItem key={index}>
                                    <TodoContentsItemCheck checked={props.checkedArr.includes(index) ? true : false} 
                                    id={index} onChange={
                                        (e) => {
                                            handleItemCheck(e)
                                            checkedItemHandler(e.target.checked, index)
                                        }
                                    }/>
                                    <TodoItemName checkedArr={props.checkedArr} index={index} htmlFor={index}>{name}</TodoItemName>
                                    <TodoItemButtonContainer>
                                        <TodoItemDelete onClick={
                                            () => {
                                                todoItemDelete(index);
                                                todoItemCheckedDelete();
                                            }
                                        }>
                                            <FontAwesomeIcon icon={faXmark} />
                                        </TodoItemDelete>
                                        <TodoItemModify>
                                            <FontAwesomeIcon icon={faPencil} />
                                        </TodoItemModify>
                                    </TodoItemButtonContainer>
                                </TodoContentsItem>
                            )
                        })
                    }
                </TodoContentsList>
            </TodoContentsDiv>
        </>
    );
}

export default TodoContents;