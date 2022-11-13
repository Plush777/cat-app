import { useEffect, useRef, useState } from "react";
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

const TodoItemName = styled.p`
    max-width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 16px;
    color: #fff;

    &[contenteditable="true"]{
        user-select: ${({modifyTodo}) => modifyTodo ? 'text' : 'none'};
        outline: ${({modifyTodo}) => modifyTodo && 'none'};
    }
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

    let [modifyTodo,setModifyTodo] = useState([]);

    const contentEditRef = useRef(null);

    useEffect(() => {
        contentEditRef.current.focus();
    },[contentEditRef])

    const todoItemDelete = el => {
        props.setTodoData(props.todoData.filter(item => item !== el));

        if(props.todoData.length === 1){
            props.setAddTodoEvent(false);
            props.setChangeAdd(false);
            props.setChangeAddButton(false);
        }
    }

    return (  
        <>
            <TodoContentsDiv>
                <TodoContentsList>
                    {
                        props.todoData.map((item,i) => {

                            const todoItemModify = () => {
                                let modifyTodoCopy = [...modifyTodo];
                                modifyTodoCopy[i] = true;
                                setModifyTodo(modifyTodoCopy);
                            }

                            console.log(modifyTodo);

                            return (
                                <TodoContentsItem key={i}>
                                    <TodoItemName contentEditable={modifyTodo[i]} 
                                    suppressContentEditableWarning={modifyTodo[i]} ref={contentEditRef} modifyTodo={modifyTodo}>{item}</TodoItemName>
                                    <TodoItemButtonContainer>
                                        <TodoItemDelete onClick={() => todoItemDelete(item)}>
                                            <FontAwesomeIcon icon={faXmark} />
                                        </TodoItemDelete>
                                        <TodoItemModify onClick={() => todoItemModify()}>
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