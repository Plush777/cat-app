import styled from "styled-components";
import TodoAdd from "./TodoAdd";
import TodoEmpty from "./TodoEmpty";

const TodoBox = styled.div`
    position: absolute;
    right: 0;
    width: 320px;
    border-radius: 6px;
    background-color: rgba(15,15,15,0.75);
    transition: .5s ease-in-out;
    top: -300px;
`

const TodoHeader = styled.div`
    padding: 16px 16px 0 16px;
    font-size: 20px;
    color: #fff;
`

function TodoListBox(props) {

    return ( 
        <>
            <TodoBox>
                <TodoHeader>Todo</TodoHeader>
                <TodoEmpty></TodoEmpty>
                <TodoAdd/>
            </TodoBox>
        </>
     );
}

export default TodoListBox;