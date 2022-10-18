import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass , faAngleDown} from "@fortawesome/free-solid-svg-icons";
import { faGoogle , faEdge } from "@fortawesome/free-brands-svg-icons";
import { faN } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import SearchTooltip from "./SearchTooltip";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import useLocalStorage from "use-local-storage";

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
    color: ${({searchStyle}) => searchStyle ? '#fff' : 'rgba(255,255,255,0.5)'};

    ${SearchInner}:focus-within &{
        color: #fff;
    }
`

const SearchSelect = styled.div`
    opacity: ${({searchStyle}) => searchStyle ? '1' : '0'};
    visibility: ${({searchStyle}) => searchStyle ? 'visible' : 'hidden'};
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 5px;
    height: 40px;
    color: ${({searchStyle}) => searchStyle ? '#fff' : 'rgba(255,255,255,0.5)'};
    transition: .5s ease-in-out;

    ${SearchInner}:hover & {
        opacity: 1;
        visibility: visible;
    }
`

const SearchLine = styled.div`
    opacity: ${({searchStyle}) => searchStyle ? '1' : '0'};
    visibility: ${({searchStyle}) => searchStyle ? 'visible' : 'hidden'};
    width: 100%;
    position: absolute;
    bottom: 0;
    border-bottom: 2px solid ${({searchStyle}) => searchStyle ? '#fff' : 'rgba(255,255,255,0.5)'};
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

    let [toolTipToggle,setToolTipToggle] = useState(false); //툴팁용 boolean
    let [selectClass,setSelectClass] = useState(''); //툴팁만 active
    let [searchStyle,setSearchStyle] = useState(false); //툴팁 제외한 검색창 boolean
    let [selected, setSelected] = useLocalStorage('searchSelected', 'faGoogle');
    let [searchValue, setSearchValue] = useState('');
    let [searchUrl, setSearchUrl] = useState(''); //검색 url이 저장되는 공간

    const ref = useRef();

    const toolTipToggleHandler = () => {
        setToolTipToggle(!toolTipToggle);
    }

    const searchOpacityHandler = () => {
        setSearchStyle(!searchStyle);
    }

    const currentSearch = (e) => {
        setSearchValue(e.target.value);
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

    useEffect(() => {
        if(selected === 'faGoogle'){
            setSearchUrl('https://www.google.com/search?q=');
        } else if(selected === 'faN'){
            setSearchUrl('https://search.naver.com/search.naver?query=');
        } else if(selected === 'faEdge'){
            setSearchUrl('https://www.bing.com/search?q=');
        }
    },[selected])

    const handleClickOutside = e => {
        if(ref.current && !ref.current.contains(e.target)){
            setToolTipToggle(false);
            setSearchStyle(false);
        }
    }

    const searchSubmit = e => {
        if(e.key === 'Enter' && searchValue !== ''){
            window.open(searchUrl + searchValue);
        }
    }

    return (
        <>
            <SearchConetainer>
                <SearchInner>
                    <ViewIcon searchStyle={searchStyle}>
                        <FontAwesomeIcon className="ico search" icon={faMagnifyingGlass} />
                    </ViewIcon>
                    <SearchInputContainer>
                        <input type="text" className="searchForm" autoComplete="off" spellCheck="false"
                        value={searchValue} onChange={currentSearch} onKeyPress={searchSubmit}/>
                    </SearchInputContainer>
                    <SearchSelect searchStyle={searchStyle} onClick={() => {
                        toolTipToggleHandler()
                        searchOpacityHandler()
                    }} ref={ref}>
                        <SearchTooltip setSearchStyle={setSearchStyle} setToolTipToggle={setToolTipToggle} selectClass={selectClass} selected={selected} setSelected={setSelected}/>
                        {
                            selected === 'faGoogle' && <FontAwesomeIcon className="ico" icon={faGoogle} />
                        }
                        {
                            selected === 'faEdge' && <FontAwesomeIcon className="ico" icon={faEdge} />
                        }
                        {
                            selected === 'faN' && <FontAwesomeIcon className="ico" icon={faN} />
                        }      
                        <FontAwesomeIcon className="ico angle" icon={faAngleDown}/>
                    </SearchSelect>
                    <SearchLine searchStyle={searchStyle} aria-hidden="true"/>
                </SearchInner>
            </SearchConetainer>
        </>
     );
}

export default SearchForm;