import styled from "styled-components";

const TodoAddDiv = styled.div`
    width: 100%;
    height: 40px;
`

function TodoAdd() {
    return ( 
        <>
            <TodoAddDiv>
                <input type="text" placeholder="할 일을 적어보세요." className="todo" />
            </TodoAddDiv>
        </>
     );
}

export default TodoAdd;