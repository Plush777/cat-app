import styled from "styled-components";

const Empty = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 20px;
    padding: 45px 0 55px;
`

const EmptyDesc = styled.p`
    text-align: center;
    font-size: 15px;
    color: rgba(255,255,255,0.7);
    line-height: 22px;
`

const BtnAdd = styled.button.attrs({'type': 'button'})`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 110px;
    height: 30px;
    font-size: 14px;
    color: #fff;
    border-radius: 4px;
    border: 1px solid #fff;
    background-color: transparent;
    transition: .5s ease-in-out;

    &:hover{
        background-color: rgba(255,255,255,0.1);
    }
`

function TodoEmpty(props) {

    const changeTodo = () => {
        props.setChangeAdd(true);
    }

    return ( 
        <>
            <Empty>
                <EmptyDesc>할 일이 비어있어요.<br/>한번 추가해보세요!</EmptyDesc>
                {
                    !props.changeAdd &&  <BtnAdd onClick={changeTodo}>할 일 추가하기</BtnAdd>
                }
            </Empty>
        </>
     );
}

export default TodoEmpty;