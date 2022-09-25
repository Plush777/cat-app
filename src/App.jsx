import './scss/App.scss';
import './scss/reset.scss'
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import Loading from './components/Loading';
import BgError from './components/BgError';
import WhatsYourName from './components/WhatsYourName';
import Main from './components/Main';
import useLocalStorage from 'use-local-storage';

function App() {

    let [userName,setUserName] = useLocalStorage('userName','');
    let [background, setBackground] = useState('');
    let [loading, setLoading] = useState(true);
    let [error, setError] = useState(false);
    let [yourName, setYourName] = useState(false);
    let [isPressed,setIsPressed] = useLocalStorage('enter',false);

    useEffect(() => {
        axios.get('https://api.thecatapi.com/v1/images/search').then((res) => {
            setBackground(res.data[0]);
            setLoading(false);
            setError(false);
        }).catch(() => {
            setError(true);
            setLoading(false);
            setBackground('');
        });
    },[]);

    useEffect(() => {
        if(userName === ''){
            setIsPressed(false);
        }
    },[userName,setIsPressed])

    useEffect(() => {
        if(!isPressed){
            setYourName(false);
        } else {
            setYourName(true);
        }
    },[isPressed]);

    console.log(yourName);
    console.log(`isPressed: ${isPressed}`);

  return (
    <div className="App">
        <div id='bg'>
            {background && <img src={background.url} alt='background'/>}

            {loading && <Loading/>}

            {error && <BgError/>}

            {!yourName && <WhatsYourName setYourName={setYourName} yourName={yourName} 
            userName={userName} setUserName={setUserName} isPressed={isPressed} setIsPressed={setIsPressed}/>}

            {yourName && <Main yourName={yourName} userName={userName}/>}
        </div>
    </div>
  );
}

export default App;
