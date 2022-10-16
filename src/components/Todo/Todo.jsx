import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import TodoListBox from "./TodoListBox";
import { useTransition } from "react-spring";

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
        setIsOpen(prev => !prev);
    }

    const transitions = useTransition(isOpen,{
        from: { opacity: 0 , transform: 'translateY(10%)' },
        enter: { opacity: 1 , transform: 'translateY(0%)' },
        leave: { opacity: 0 , transform: 'translateY(10%)' },
        config: { duration: 200 }
    });

    const ref = useRef();

    useEffect(() => {
        document.addEventListener('mousedown',handleClickOutside);
        
        return () => {
            document.removeEventListener('mousedown',handleClickOutside);
        }
    },[ref]);

    const handleClickOutside = e => {
        if(ref.current && !ref.current.contains(e.target)){
            setIsOpen(false);
        }
    }

    return ( 
        <>  
            <BtnTodoDiv ref={ref}>
                <BtnTodo onClick={toggleTodo} isOpen={isOpen}>Todo</BtnTodo>
                {
                    transitions((style, item) => item && <TodoListBox style={style}/>)
                }
            </BtnTodoDiv>
        </>
     );
}

export default Todo;