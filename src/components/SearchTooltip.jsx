import styled from "styled-components";

const List = styled.ul`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 5px 0;
`

const ListItem = styled.li`
    display: flex;
    align-items: center;
    width: 100%;
    height: 28px;
    cursor: pointer;
    &:hover{
        background-color: rgba(255,255,255,0.1);
    }
`

const ListTxt = styled.span`
    font-size: 13px;
    color: #fff;
    cursor: pointer;
    text-indent: 7px;
`

function SearchTooltip(props) {
    return ( 
        <>
            <div className={`toolTip arrowUp searchWith ${props.selectClass}`} style={{
                right: '-60px',
                top: '50px'
            }}>
                <List>
                    <ListItem>
                        <ListTxt>Google</ListTxt>
                    </ListItem>
                    <ListItem>
                        <ListTxt>Edge</ListTxt>
                    </ListItem> 
                    <ListItem>
                        <ListTxt>Naver</ListTxt>
                    </ListItem>
                </List>
            </div>
        </>
     );
}

export default SearchTooltip;