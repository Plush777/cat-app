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

    const engine = [
        {
            id: 1,
            txt: 'Google',
            icons: 'faGoogle'
        },
        {
            id: 2,
            txt: 'Edge',
            icons: 'faEdge'
        },
        {
            id: 3,
            txt: 'Naver',
            icons: 'faN'
        }
    ]

    const handleSelect = () => {
        props.setToolTipToggle(false);
        props.setSearchStyle(true);
    }

    return ( 
        <>
            <div className={`toolTip arrowUp searchWith ${props.selectClass}`} style={{
                right: '-60px',
                top: '50px'
            }}>
                <List>
                    {
                       Object.keys(engine).map((item , index) => {
                            return (
                                <ListItem key={engine[index].id} onClick={
                                    (e) => {props.setSelected(engine[index].icons)
                                    e.stopPropagation()
                                    handleSelect()
                                    }}>
                                    <ListTxt>{engine[item].txt}</ListTxt>
                                </ListItem>
                            )
                        })
                    }

                    {console.log(props.selected)}
                </List>
            </div>
        </>
     );
}

export default SearchTooltip;