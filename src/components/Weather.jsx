import axios from "axios";
import { useEffect , useState } from "react";

function Weather() {
    const [weatherTemp,setWeatherTemp] = useState ('');
    const [weatherDesc,setWeatherDesc] = useState ('');
    const [weatherIcon,setWeatherIcon] = useState ('');
    const [weatherLocation,setWeatherLocation] = useState ('');

    useEffect(() => {
        const cityName = 'Seoul';
        const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

        axios.get(url).then((res) => {
            const data = res.data;
            const temp = data.main.temp;

            setWeatherTemp((temp - 273.15).toFixed(1));
            setWeatherDesc(data.weather[0].description);
            setWeatherIcon(data.weather[0].icon);
            setWeatherLocation(data.name);
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
    },[]);

    const img = `http://openweathermap.org/img/wn/${weatherIcon}.png`;

    return ( 
        <>
            <div className="weatherWrap">
                <div className="weatherContainer">
                    <div className="weatherImg">
                        {weatherIcon && <img src={img} alt="weather"/>}
                    </div>
                    <div className="weatherDesc">
                        <span className="temp">{weatherTemp}°C</span>
                        
                        <span className="desc hidden">{weatherDesc}</span>
                    </div>
                </div>
                <div className="location">
                    <span className="locationName">{weatherLocation}</span>
                </div>
            </div>
        </>
     );
}

export default Weather;