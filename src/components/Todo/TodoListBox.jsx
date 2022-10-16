import { useState } from "react";
import styled from "styled-components";
import TodoAdd from "./TodoAdd";
import TodoEmpty from "./TodoEmpty";
import { animated } from "react-spring";
import useLocalStorage from "use-local-storage";
import TodoContents from "./TodoContents";
import { useEffect } from "react";

const TodoBox = styled(animated.div)`
    position: absolute;
    right: 0;
    width: 320px;
    border-radius: 6px;
    background-color: rgba(15,15,15,0.75);
    bottom: 40px;
`

const TodoHeader = styled.div`
    padding: 16px 16px 0 16px;
    font-size: 20px;
    color: #fff;
`

function TodoListBox(props) {

    let [changeAdd,setChangeAdd] = useLocalStorage('changeAdd',false);
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

    return ( 
        <>
            <TodoBox style={props.style}>
                <TodoHeader>Todo</TodoHeader>
                {
                    addTodoEvent ? 
                    <TodoContents todoData={todoData} setTodoData={setTodoData}/> 
                        : 
                    <TodoEmpty changeAdd={changeAdd} setChangeAdd={setChangeAdd}/>
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