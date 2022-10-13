import { useState } from "react";
import styled from "styled-components";
import TodoListBox from "./TodoListBox";

const BtnTodoDiv = styled.div`
    position: absolute;
    bottom: 10px;
    right: 15px;
`

const BtnTodo = styled.button.attrs({'type': 'button'})`
    font-size: 18px;
    color: ${({ isOpen }) => isOpen ? '#fff' : 'rgba(255,255,255,0.5);'};
    transition: .5s ease-in-out;
    &:hover{color: #fff;}
`

function Todo() {

    let [isOpen, setIsOpen] = useState(false);

    const toggleTodo = () => {
        setIsOpen(!isOpen);
    }

    return ( 
        <>  
            <BtnTodoDiv>
                <BtnTodo onClick={toggleTodo} isOpen={isOpen}>Todo</BtnTodo>
                {
                    isOpen && <TodoListBox isOpen={isOpen} />
                }
            </BtnTodoDiv>
        </>
     );
}

export default Todo;