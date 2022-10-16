import styled from "styled-components";

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
    font-size: 16px;
    color: #fff;

    &+&{
        padding-top: 5px;
    }
`

const TodoContentsItemCheck = styled.input.attrs({'type': 'checkbox'})`
    margin: 0 5px 0 0;
`

const TodoItemName = styled.span`
    font-size: inherit;
    color: inherit;
`

function TodoContents(props) {
    return (  
        <>
            <TodoContentsDiv>
                <TodoContentsList>
                    {
                        props.todoData.map(item => {
                            return (
                                <TodoContentsItem key={item.id}>
                                    <TodoContentsItemCheck/>
                                    <TodoItemName>{item.name}</TodoItemName>
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