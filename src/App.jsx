import { useState } from 'react'
import { PiWindLight } from "react-icons/pi";
import { MdOutlineWaves } from "react-icons/md";
import clear from "../Assets/clear.png"
import clouds from "../Assets/cloud.png"
import snow from "../Assets/snow.png"
import rain from "../Assets/rain.png"

function App() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [weather, setWeather] = useState(null);
  const [searchCity, setSearchCity] = useState("");

  async function getWeather() {
    if (searchCity === '') {   // handling empty input 
      alert("Enter a city name!")
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      if (response.status === 404) alert("City not found..");
      if (response.status === 429) alert("Too many Requests try again later....");
      if (!response.ok) throw new Error(`Response status: ${response.status}`);

      const result = await response.json();
      setWeather(result);
    } catch (error) {
      console.error(error.message);
    }
  }

  const getWeatherIcon = () => {
    if (!weather) return clear;
    switch (weather.weather[0].main) {
      case "Clouds": return clouds;
      case "Rain": return rain;
      case "Snow": return snow;
      case "Clear": default: return clear;
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center p-4">
      
      {/* main card */}
      <div className="w-full max-w-md rounded-3xl bg-[#74b2ff] p-6 sm:p-8 shadow-xl flex flex-col">
        
        {/* search */}
        <div className="flex items-center gap-3 w-full mb-6">
          <input 
            onKeyDown={(e) => { if (e.key === "Enter") getWeather(); }} 
            placeholder="Enter a city name..." 
            value={searchCity} 
            onChange={(e) => setSearchCity(e.target.value)} 
            className="flex-1 bg-white rounded-full py-3 px-5 outline-none w-full" 
            type="search" 
          />
          <button 
            onClick={getWeather} 
            className="text-gray-600 bg-white rounded-full p-3 flex items-center justify-center shrink-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
        </div>

        {/* center stuff */}
        <div className="flex flex-col items-center text-center">
          <img className="w-32 h-32 object-contain mb-4" src={getWeatherIcon()} alt="weather icon" />
           
          <h1 className="text-5xl font-bold">
            {weather ? Math.round(weather.main.temp) : '20'}°C
          </h1>
          
          <span className="mt-2 text-lg capitalize">
            {weather ? weather.weather[0].description : "clear sky"}
          </span>

          {weather && (
            <div className="flex gap-4 text-gray-700 text-sm mt-3 font-medium">
              <p>Min: {Math.round(weather.main.temp_min)}°C</p>
              <p>Max: {Math.round(weather.main.temp_max)}°C</p>
            </div>
          )}

          <h2 className="text-3xl font-medium mt-4 tracking-wide">
            {weather ? `${weather.name}, ${weather.sys.country}` : "New York, US"}
          </h2>
        </div>

        {/* bottom stuff */}
        <div className="flex flex-col sm:flex-row gap-4 w-full mt-8">
          
          <div className="flex-1 py-3 px-4 flex items-center justify-center gap-3 border-2 border-white/40 rounded-2xl">
            <MdOutlineWaves className="text-3xl" />
            <div className="flex flex-col">
              <span className="text-xl font-semibold">{weather ? weather.main.humidity : "20"}%</span>
              <span className="text-sm">Humidity</span>
            </div>
          </div>

          <div className="flex-1 py-3 px-4 flex items-center justify-center gap-3 border-2 border-white/40 rounded-2xl">
            <PiWindLight className="text-3xl" />
            <div className="flex flex-col">
              <span className="text-xl font-semibold">{weather ? weather.wind.speed : "20"} km/h</span>
              <span className="text-sm">Wind Speed</span>
            </div>
          </div>

        </div>
      </div>

      {/* footer */}
      <div className="mt-8 mb-4 border-2 px-4 py-2 border-gray-300 bg-white/10 backdrop-blur-md rounded-2xl text-white text-sm shadow-sm text-center">
        Made by Aditya with ❤️
      </div>
      
    </div>
  )
}

export default App