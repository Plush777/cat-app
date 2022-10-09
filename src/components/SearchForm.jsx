import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass , faAngleDown} from "@fortawesome/free-solid-svg-icons";
import { faGoogle , faEdge } from "@fortawesome/free-brands-svg-icons";
import { faN } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import SearchTooltip from "./SearchTooltip";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

const SearchConetainer = styled.div`
    position: absolute;
    top: 5px;
    left: 15px;
    display: flex;
    align-items: center;
    cursor: pointer;
`

const SearchInner = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`

const ViewIcon = styled.i`
    width: 16px;
    height: 16px;
    color: ${({toolTipToggle}) => toolTipToggle ? '#fff' : 'rgba(255,255,255,0.5)'};

    ${SearchInner}:focus-within &{
        color: #fff;
    }
`

const SearchSelect = styled.div`
    opacity: ${({toolTipToggle}) => toolTipToggle ? '1' : '0'};
    visibility: ${({toolTipToggle}) => toolTipToggle ? 'visible' : 'hidden'};
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 5px;
    height: 40px;
    color: ${({toolTipToggle}) => toolTipToggle ? '#fff' : 'rgba(255,255,255,0.5)'};
    transition: .5s ease-in-out;

    ${SearchInner}:hover & {
        opacity: 1;
        visibility: visible;
    }
`

const SearchLine = styled.div`
    opacity: ${({selectClass}) => selectClass ? '1' : '0'};
    visibility: ${({selectClass}) => selectClass ? 'visible' : 'hidden'};
    width: 100%;
    position: absolute;
    bottom: 0;
    border-bottom: 2px solid ${({selectClass}) => selectClass ? '#fff' : 'rgba(255,255,255,0.5)'};
    transition: .5s ease-in-out;

    ${SearchInner}:hover & {
        opacity: 1;
        visibility: visible;
    }
`

const SearchInputContainer = styled.div`
    display: flex;

    &:focus-within {
        ~ ${SearchLine}{
            opacity: 1;
            visibility: visible;
            border-bottom-color: #fff;
        }

        ~ ${SearchSelect}{
            opacity: 1;
            visibility: visible;
        }
    }
    input{cursor: pointer;}
`

function SearchForm() {

    let [toolTipToggle,setToolTipToggle] = useState(false);
    let [selectClass,setSelectClass] = useState('');

    const ref = useRef();

    const toolTipToggleHandler = () => {
        setToolTipToggle(!toolTipToggle);
    }

    useEffect(() => {
        if(toolTipToggle){
            setSelectClass('active');
        } else{
            setSelectClass('');
        }
    },[toolTipToggle])

    useEffect(() => {
        document.addEventListener('mousedown',handleClickOutside);
        
        return () => {
            document.removeEventListener('mousedown',handleClickOutside);
        }
    },[ref]);

    const handleClickOutside = e => {
        if(ref.current && !ref.current.contains(e.target)){
            setToolTipToggle(false);
        }
    }

    return (
        <>
            <SearchConetainer>
                <SearchInner>
                    <ViewIcon toolTipToggle={toolTipToggle}>
                        <FontAwesomeIcon className="ico search" icon={faMagnifyingGlass} />
                    </ViewIcon>
                    <SearchInputContainer>
                        <input type="text" className="searchForm" autoComplete="off" spellCheck="false"/>
                    </SearchInputContainer>
                    <SearchSelect toolTipToggle={toolTipToggle} onClick={toolTipToggleHandler} ref={ref}>
                        <FontAwesomeIcon className="ico" icon={faGoogle} />
                        <FontAwesomeIcon className="ico angle" icon={faAngleDown}/>
                    </SearchSelect>
                    <SearchTooltip selectClass={selectClass}/>
                    <SearchLine className={selectClass} selectClass={selectClass} aria-hidden="true"/>
                </SearchInner>
            </SearchConetainer>
        </>
     );
}

export default SearchForm;