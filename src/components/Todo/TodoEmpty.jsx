import styled from "styled-components";

const Empty = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 20px;
    padding: 40px 0;
`

const EmptyDesc = styled.p`
    text-align: center;
    font-size: 15px;
    color: #fff;
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

function TodoEmpty() {
    return ( 
        <>
            <Empty>
                <EmptyDesc>할 일이 비어있네요!<br/>아래 버튼을 눌러 추가해보세요.</EmptyDesc>
                <BtnAdd>할 일 추가하기</BtnAdd>
            </Empty>
        </>
     );
}

export default TodoEmpty;