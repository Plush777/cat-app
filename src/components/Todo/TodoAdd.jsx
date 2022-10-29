import styled from "styled-components";

const TodoAddDiv = styled.div`
    width: 100%;
    height: 40px;
`

function TodoAdd(props) {

    const inputTodo = e => {
        props.setAddTodo(e.target.value);
        props.setAddTodoValue(e.target.value);
    }

    const enter = e => {
        if(e.key === 'Enter' && props.addTodoValue !== ''){
            props.setAddTodoEvent(true);
            props.setAddTodoValue('');

            props.setTodoData([
                ...props.todoData,
                {
                    name: props.addTodo,
                    index: props.todoData.length
                }
            ]);

            console.log(props.addTodo);
        }
    }

    return ( 
        <>
            <TodoAddDiv>
                <input type="text" placeholder="할 일을 적어보세요." className="todo" onChange={inputTodo} 
                onKeyPress={enter} value={props.addTodoValue} spellCheck="false"/>
            </TodoAddDiv>
        </>
     );
}

export default TodoAdd;