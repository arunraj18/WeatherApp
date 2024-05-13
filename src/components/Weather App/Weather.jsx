import React, { useState } from 'react'
import './Weather.css'
import cloud from "../Assets/cloud.png"
import snow from "../Assets/snow.png"
import humidity from "../Assets/humidity.png"
import wind from "../Assets/wind.png"
import sunrise from "../Assets/sunrise.png"
import sunset from "../Assets/sunset.png"
import feelslike from "../Assets/feelslike.png"
import overcast from "../Assets/overcast.png"
import thunder from "../Assets/thunder.png"
import drizzle from "../Assets/drizzle.png"
import rain from "../Assets/rainy.png"
import cloudimg from "../Assets/cloudimg.jpg"
import snowimg from "../Assets/snowimg.jpg"
import rainimg from "../Assets/rainimg.jpg"
import thunderimg from "../Assets/thunderimg.jpg"
import drizzleimg from "../Assets/drizzleimg.jpg"
import overcastimg from "../Assets/overcastimg.jpg"

import './Weather.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudBolt } from '@fortawesome/free-solid-svg-icons';
import { faSearchLocation } from '@fortawesome/free-solid-svg-icons';


const Weather = () => {

    const [wicon,setwicon]=useState(cloud)
    const [backimg,setbackimg]=useState(cloudimg)


      //search function defined
      const Search= async ()=>{
        const City = document.getElementById('searchinput');
        const cleanedInput = City.value.replace(/\s/g, '');
        const [cityName, ...stateArray] = cleanedInput.split(',');
        const state = stateArray.join(',');
        console.log(cityName,"staaaa",state)
        const MapApiKey="pk.eyJ1IjoiYXJ1bnJhajAxODAiLCJhIjoiY2x2enI4ZTg0MzF3dzJwbzY5a3hmNGo4NiJ9.0ZJJCul-hzfSYgOojLcXQg";
        const mapboxEndpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${cityName}, ${state}.json?access_token=${MapApiKey}`;
        //const mapboxEndpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/syracuse, Newyork.json?access_token=pk.eyJ1IjoiYXJ1bnJhajAxODAiLCJhIjoiY2x2enI4ZTg0MzF3dzJwbzY5a3hmNGo4NiJ9.0ZJJCul-hzfSYgOojLcXQg`;
        try{
        const response = await fetch(mapboxEndpoint);
        const MapData = await response.json();
        console.log(MapData)
        const coordinates = MapData.features[0].center;
        const latitude = coordinates[1];
        const longitude = coordinates[0];
        console.log(latitude,longitude)
        const api_key="70052a383a9f5522e2157b6ef96ad0fc";
        const url=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${api_key}`
        try{
            let response=await fetch(url)
            if (!response.ok) {
                throw new Error('City not found');
            }
            
            let data= await response.json();
            let temp=document.getElementsByClassName('weather-temp')
            let cityname=document.getElementsByClassName('weather-location')
            let humi=document.getElementsByClassName('humidity-percent')
            let winds=document.getElementsByClassName('wind-speed')

            if (temp && cityname.length > 0 && humi.length > 0 && winds.length > 0) {
                temp[0].innerHTML = parseInt(data.main.temp) + '°C';
                cityname[0].innerHTML = cityName+","+state;
                humi[0].innerHTML = data.main.humidity + '%';
                winds[0].innerHTML = data.wind.speed + 'm/h';
            }
            else{
                return 0;
            }
        
            // Apply timezone offset to the timestamps
            const sunriseTimestampAdjusted = data.sys.sunrise + data.timezone;
            const sunsetTimestampAdjusted = data.sys.sunset + data.timezone;
        
            // Create Date objects using the adjusted timestamps
            const sunriseDate = new Date(sunriseTimestampAdjusted * 1000);
            const sunsetDate = new Date(sunsetTimestampAdjusted * 1000);
        
            // Function to format time as HH:MM
            const formatTime = (date) => {
            return `${String(date.getHours()+4).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
            };
        
            // Format the times
            const formattedSunrise = formatTime(sunriseDate);
            const formattedSunset = formatTime(sunsetDate);
            let set=document.getElementsByClassName('sunset')
            let rise=document.getElementsByClassName('sunrise')
            let flike=document.getElementsByClassName('feelslike')
            rise[0].innerHTML=formattedSunrise+' AM'
            set[0].innerHTML=formattedSunset+' PM'
            flike[0].innerHTML=data.main.feels_like+'°C'
                
            //dynamic weather image
            if(data.weather[0].icon==='01d' || data.weather[0].icon==='01n'){
                setwicon(cloud)
                setbackimg(cloudimg)
            }
            else if(data.weather[0].icon==='11d' || data.weather[0].icon==='11n'){
                setwicon(thunder)
                setbackimg(thunderimg)
            }
            else if(data.weather[0].icon==='03d' || data.weather[0].icon==='03n'){
                setwicon(overcast)
                setbackimg(overcastimg)
            }
            else if(data.weather[0].icon==='04d' || data.weather[0].icon==='04n'){
                setwicon(overcast)
                setbackimg(overcastimg)
            }
            else if(data.weather[0].icon==='09d' || data.weather[0].icon==='09n'){
                setwicon(drizzle)
                setbackimg(drizzleimg)
            }
            else if(data.weather[0].icon==='10d' || data.weather[0].icon==='10n'){
                setwicon(rain)
                setbackimg(rainimg)
            }
            else if(data.weather[0].icon==='13d' || data.weather[0].icon==='13n'){
                setwicon(snow)
                setbackimg(snowimg)
            }
            else{
                setwicon(cloud)
                setbackimg(cloudimg)
            }
        }catch(error){
            console.error(error)
            window.alert("city not found")
    }
  }catch(error){
    window.alert("city not found")
  }
}


  return (
        <div className="par" style={{ backgroundImage: `url(${backimg})` }}>
            <div className='Navbar'>
        <div className='icon'>
          <div id='item1'>
            <FontAwesomeIcon icon={faCloudBolt} size='2x' />
          </div>
          <div id='item2'>
             <p>Weather App</p>
          </div>
         
        </div>
        <div id='right '>
          <div id='searchbar'>
            <div id='Home'>
              <p>Home</p>
            </div>
              <div id='search1'>
                  <input type="text" id='searchinput' placeholder='Search city name'/>
              </div>
              <div id='search2' onClick={()=>{Search()}}>
                  <FontAwesomeIcon icon={faSearchLocation} size='1.5x'/>
              </div>    
          </div>
        </div>
    </div>


    <div className='container'>
      <div className="weather-img">
        <img src={wicon} alt="" />
      </div>
      <div className="weather-temp">24°C</div>
      <div className="weather-location">New York</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent">45%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind} alt="" className="icon" />
          <div className="data">
            <div className="wind-speed">20 km/h</div>
            <div className="text">Wind Speed</div>

          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="element">
            <img src={sunrise} alt="" className="sicon" />
            <div className="sdata">
                <div className="sunrise">06:30 AM</div>
                <div className="stext">sunrise</div>

            </div>
            </div>
        <div className="element">
            <img src={sunset} alt="" className="sicon" />
            <div className="sdata">
                <div className="sunset">07:43 PM</div>
                <div className="stext">sunset</div>

            </div>
            </div>
        <div className="element">
            <img src={feelslike} alt="" className="sicon" />
            <div className="sdata">
                <div className="feelslike">24°C</div>
                <div className="ftext">feels like</div>
            </div>
            </div>
       </div>
    </div>
    </div>
  )
}



export default Weather;
