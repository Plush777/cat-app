import { useEffect, useState } from "react";

function WhatsYourName() {

    let [userName,setUserName] = useState('');
    let [keyHint,setKeyHint] = useState(false);
    let [keyHintFade,setKeyHintFade] = useState('');

    const handleValue = (e) => {
        setUserName(e.target.value);
        console.log(userName);
        
        if(userName){
            setKeyHint(true);
            console.log('keyHint가 트루가 되따');
        }
    }

    const enterPress = (e) => {
        if(e.key === 'Enter'){
            localStorage.setItem('userName',userName);
        }
        console.log(userName);
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

    return ( 
        <>
            <div className="center">
                <div className="column">
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