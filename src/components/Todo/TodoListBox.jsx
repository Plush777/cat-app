import { useEffect } from "react";
import { useState } from "react";
import styled, { keyframes , css } from "styled-components";
import TodoAdd from "./TodoAdd";
import TodoEmpty from "./TodoEmpty";

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`

const fadeOut = keyframes`
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
`

const TodoBox = styled.div`
    position: absolute;
    right: 0;
    /* top: ${({ todoListFade }) => todoListFade ? '-300px' : '-250px'}; */
    width: 320px;
    border-radius: 6px;
    background-color: rgba(15,15,15,0.75);
    transition: .5s ease-in-out;
    top: -300px;
    animation: ${({ animate }) => animate ? css`${fadeIn} 1s ease-in-out` : css`${fadeOut} 1s ease-in-out`};
`

const TodoHeader = styled.div`
    padding: 16px 16px 0 16px;
    font-size: 20px;
    color: #fff;
`

function TodoListBox(props) {

    let [animate,setAnimate] = useState(false);

   useEffect(() => {
        if(props.isOpen){
            setAnimate(true);
        } else {
            setTimeout(() => setAnimate(false), 1000);
        }

        
   },[props.isOpen])
   console.log(animate);
    if(!animate){
        return null;
    }

    

    return ( 
        <>
            <TodoBox animate={animate}>
                <TodoHeader>Todo</TodoHeader>
                <TodoEmpty></TodoEmpty>
                <TodoAdd/>
            </TodoBox>
        </>
     );
}

export default TodoListBox;