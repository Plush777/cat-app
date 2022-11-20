import './scss/App.scss';
import './scss/reset.scss';
import './scss/mobile.scss';
import axios from 'axios';
import { useEffect} from 'react';
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
    let [todayList,setTodayList] = useState(false); //todayList 컴포넌트 렌더링 여부
    let [todayStorage,setTodayStorage] = useLocalStorage('todayList',''); //todayList 컴포넌트에서 인풋값 저장
    let [todayIsPressed,setTodayIsPressed] = useLocalStorage('todayIsPressed',false); //todayList 컴포넌트에서 인풋값 저장
    let [m550, setM550] = useState(false); //모바일 550

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

    useEffect(() => {
        if (window.matchMedia("(max-width: 550px)").matches) {
            setM550(true);
        } else {
            setM550(false);
        }
    },[setM550]);

    return (
        <div className="App">
            <div id='bg'>
                {background && <img src={background.url} alt='background'/>}

                {loading && <Loading/>}

                {error && <BgError/>}

                {!yourName && <WhatsYourName setYourName={setYourName} yourName={yourName} 
                userName={userName} setUserName={setUserName} isPressed={isPressed} setIsPressed={setIsPressed}/>}

                {yourName && <Main yourName={yourName} userName={userName} todayStorage={todayStorage} 
                setTodayStorage={setTodayStorage} todayList={todayList} setTodayList={setTodayList} todayIsPressed={todayIsPressed}
                setTodayIsPressed={setTodayIsPressed} m550={m550} setM550={setM550}/>}
            </div>
        </div>
    );
}

export default App;
