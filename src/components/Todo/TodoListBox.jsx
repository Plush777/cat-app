import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import TodoAdd from "./TodoAdd";
import TodoEmpty from "./TodoEmpty";

const TodoBox = styled.div`
    opacity: ${({ todoListFade }) => todoListFade ? '1' : '0'};
    visibility: ${({ todoListFade }) => todoListFade ? 'visible' : 'hidden'};
    position: absolute;
    right: 0;
    top: ${({ todoListFade }) => todoListFade ? '-300px' : '-250px'};
    width: 320px;
    border-radius: 6px;
    background-color: rgba(15,15,15,0.75);
    transition: .5s ease-in-out;
`

const TodoHeader = styled.div`
    padding: 16px 16px 0 16px;
    font-size: 20px;
    color: #fff;
`

function TodoListBox(props) {

    let [todoListFade, setTodoListFade] = useState(false);

    useEffect(() => {
        if(props.isOpen){
            setTodoListFade(true);
        } else {
            setTodoListFade(false);
        }
    },[props])

    return ( 
        <>
            <TodoBox todoListFade={todoListFade}>
                <TodoHeader>Todo</TodoHeader>
                <TodoEmpty></TodoEmpty>
                <TodoAdd/>
            </TodoBox>
        </>
     );
}

export default TodoListBox;