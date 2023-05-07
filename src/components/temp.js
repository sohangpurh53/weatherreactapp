import React, { useEffect, useState} from 'react'
import './temp.css'
const Temp = () => {
    const [searchValue, setSearchValue] = useState('ahmedabad');
    const [tempInfo, setTempInfo] = useState({});
    const [weatherState,setWeatheState] = useState("");
    

    useEffect(()=>{
      getWeatherInfo()
    }, [] )
    
 
    

    const  getWeatherInfo = async ()=>{
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=07359fe62b44a477a0b616573c713b19`
            let res = await fetch (url);
            let data = await res.json();
           
            const{temp, humidity, pressure } = data.main;
            const{main:weathermood} = data.weather[0]
            const{name}=data;
            const {speed} = data.wind;
            const {country, sunset} = data.sys;
            const weatherinfo = {
                temp,
                 humidity,
                  pressure,
                  weathermood,
                  name,
                  speed,
                  country, 
                  sunset,

            }
      
        
            console.log(weatherinfo.sunset)
            setTempInfo(weatherinfo)
        } catch (error) {
            console.log(error);
        }
    }

    let sunset = tempInfo.sunset;
    let sec = sunset;
    let date = new Date(sec * 1000);
    let sunsettime = `${date.getHours()}:${date.getMinutes()}`;
    let dayornight = (sunsettime.hours<=12)? 'AM':'PM'
    let weathermood = tempInfo.weathermood
    useEffect(()=>{
      if(weathermood){
       switch(weathermood){
         case "Clouds":
           setWeatheState("wi-day-cloudy");
           break;
         case "Haze":
           setWeatheState("wi-fog");
           break;
         case "Clear":
           setWeatheState("wi-day-sunny");
           break;
         case "Mist":
           setWeatheState("wi-dust");
           break;
 
         default:
           setWeatheState("wi-day-sunny");
           break; 
       }
 
      }
     }, [weathermood] )
   
    
  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}>
            Search
          </button>
        </div>
      </div>

      {/* our temp card  */}
      <article className="widget">
        <div className="weatherIcon">
          <i className={`wi ${weatherState}`}></i>
        </div>

        <div className="weatherInfo">
          <div className="temperature">
            <span>{tempInfo.temp}&deg;</span>
          </div>

          <div className="description">
            <div className="weatherCondition">{tempInfo.weathermood}</div>
            <div className="place">
            {tempInfo.name}, {tempInfo.country}
            </div>
          </div>
        </div>

        <div className="date"> {new Date().toLocaleString()} </div>

        {/* our 4column section  */}
        <div className="extra-temp">
          <div className="temp-info-minmax">
            <div className="two-sided-section">
              <p>
                <i className={"wi wi-sunset"}></i>
              </p>
              <p className="extra-info-leftside">
              {sunsettime} {dayornight} <br />
                Sunset
              </p>
            </div>

            <div className="two-sided-section">
              <p>
                <i className={"wi wi-humidity"}></i>
              </p>
              <p className="extra-info-leftside">
              {tempInfo.humidity} <br />
                Humidity
              </p>
            </div>
          </div>

          <div className="weather-extra-info">
            <div className="two-sided-section">
              <p>
                <i className={"wi wi-rain"}></i>
              </p>
              <p className="extra-info-leftside">
              {tempInfo.pressure} <br />
                Pressure
              </p>
            </div>

            <div className="two-sided-section">
              <p>
                <i className={"wi wi-strong-wind"}></i>
              </p>
              <p className="extra-info-leftside">
              {tempInfo.speed} <br />
                Speed
              </p>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}

export default Temp;