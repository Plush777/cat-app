import { useEffect, useState } from "react";

function WhatsYourName(props) {

    let [keyHint,setKeyHint] = useState(false);
    let [keyHintFade,setKeyHintFade] = useState('');
    let [questionFade, setQuestionFade] = useState('');

    const handleValue = (e) => {
        props.setUserName(e.target.value);
        console.log(props.userName);
        
        if(props.userName){
            setKeyHint(true);
            console.log('keyHint가 트루가 되따');
        }
    }

    const enterPress = (e) => {
        if(e.key === 'Enter'){
            props.setYourName(true);
            props.setIsPressed(true);
        }
    }

    useEffect(() => {
        if(keyHint){
            let timeout = setTimeout(() => {
                setKeyHintFade('active');
                return (() => {
                    clearTimeout(timeout);
                })
            }, 3000);
        }
    },[keyHint]);

    useEffect(() => {
        let timeout = setTimeout(() => {
            setQuestionFade('active');
            return (() => {
                clearTimeout(timeout);
            })
        }, 1000);
    },[questionFade]);

    return ( 
        <>
            <div className="center">
                <div className={'column questionWrap ' + questionFade}>
                    <div className="question">
                        <p>Hello, what's your name?</p>
                    </div>
                    <div className="username">
                        <input type="text" className="center" autoFocus autoComplete="off" spellCheck="false"
                        onChange={handleValue} onKeyPress={enterPress}/>
                    </div>
                    {
                        keyHint && <p className={'keyHint ' + keyHintFade}>Press Enter ↵</p>
                    }
                </div>
            </div>
        </>
     );
}

export default WhatsYourName;