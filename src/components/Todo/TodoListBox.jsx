import { useState } from "react";
import styled from "styled-components";
import TodoAdd from "./TodoAdd";
import TodoEmpty from "./TodoEmpty";
import { animated } from "react-spring";
import useLocalStorage from "use-local-storage";
import TodoContents from "./TodoContents";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const TodoBox = styled(animated.div)`
    position: absolute;
    right: 0;
    width: 320px;
    border-radius: 6px;
    background-color: rgba(15,15,15,0.75);
    bottom: 40px;
`

const TodoHeader = styled.div`
    display: flex;
    column-gap: 10px;
    padding: 16px 16px 0 16px;
`

const TodoHeaderTitle = styled.div`
    display: flex;
    align-items: center;
    column-gap: 10px;
`

const TodoHeaderTitleTxt = styled.span`
    font-size: 20px;
    color: #fff;
`

const TodoMore = styled.button.attrs({type: 'button'})`
    opacity: 0;
    visibility: hidden;
    color: #fff;
    >svg{width: 16px; height: 16px;}
    transition: .3s ease-in-out;

    ${TodoHeaderTitle}:hover &{
        opacity: 1;
        visibility: visible;
    }
`

function TodoListBox(props) {

    let [changeAdd,setChangeAdd] = useLocalStorage('changeAdd',false); //할일 추가 버튼 누르면 나오는 input
    let [changeAddButton,setChangeAddButton] = useLocalStorage('changeAddButton',false); //할일 추가 버튼 렌더링 여부
    let [addTodoEvent,setAddTodoEvent] = useLocalStorage('addTodoEvent',false);
    let [addTodo,setAddTodo] = useState(''); //사용자가 입력한 할 일 => todoData에 저장됨
    let [addTodoValue,setAddTodoValue] = useState(''); //사용자가 입력한 할 일 => input value에만 저장됨
    let [todoData,setTodoData] = useLocalStorage('todoData',[]);

    useEffect(() => {
        if(todoData === null){
            setAddTodoEvent(false);
            setChangeAdd(false);
        } else if(!todoData === null) {
            setAddTodoEvent(true);
            setChangeAdd(true);
        }
    },[todoData,setAddTodoEvent,setChangeAdd]);

    useEffect(() => {
        if(changeAddButton && !props.isOpen){
            setChangeAddButton(false);
        } 
    },[changeAddButton,props.isOpen,setChangeAddButton,setChangeAdd])
    

    useEffect(() => {
        if(!changeAddButton && changeAdd && addTodoEvent){
            setChangeAdd(true);
        } else if(!changeAddButton && changeAdd && !addTodoEvent){
            setChangeAdd(false);
        }
    },[changeAddButton,changeAdd,addTodoEvent,setChangeAdd])

    const allClear = () => {
        setTodoData([]);
        setAddTodoEvent(false);
        setChangeAdd(false);
    }

    return ( 
        <>
            <TodoBox style={props.style}>
                <TodoHeader>
                    <TodoHeaderTitle>
                        <TodoHeaderTitleTxt>Todo</TodoHeaderTitleTxt>
                        {
                            addTodoEvent && 
                            <TodoMore onClick={allClear}>
                                <FontAwesomeIcon icon={faTrash}/>
                            </TodoMore>
                        }
                    </TodoHeaderTitle>
                </TodoHeader>
                {
                    addTodoEvent ? 
                    <TodoContents todoData={todoData} setTodoData={setTodoData}/> 
                        : 
                    <TodoEmpty changeAdd={changeAdd} setChangeAdd={setChangeAdd} changeAddButton={changeAddButton}
                    setChangeAddButton={setChangeAddButton}/>
                }
                
                {
                    changeAdd && <TodoAdd addTodo={addTodo} setAddTodo={setAddTodo} todoData={todoData}
                    setTodoData={setTodoData} addTodoEvent={addTodoEvent} setAddTodoEvent={setAddTodoEvent}
                    addTodoValue={addTodoValue} setAddTodoValue={setAddTodoValue}/>
                }
            </TodoBox>
        </>
     );
}

export default TodoListBox;