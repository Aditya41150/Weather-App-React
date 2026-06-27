import { useState, useEffect } from 'react'
import { PiWindLight } from "react-icons/pi";
import { MdImportExport, MdOutlineWaves } from "react-icons/md";
import clear from "../Assets/clear.png"
import clouds from "../Assets/cloud.png"
import snow from "../Assets/snow.png"
import rain from "../Assets/rain.png"


function App() {
  const apiKey = import.meta.env.VITE_API_KEY;

  const [weather, setWeather] = useState(null); // one state for all weather details

  const [searchCity, setSearchCity] = useState("");


  // the most important part to learn
  async function getWeather() {
    if (searchCity == '') {
      alert("Enter a city name!")
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      if(response.status === 404)
      {
        alert("City not found..")
      }
      if(response.status === 429){
        alert("Too many Requests try again later....")
      }
      
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      setWeather(result); // very important 


    } catch (error) {
      console.error(error.message);
    }
  }
  //console.log(weather);

  const getWeatherIcon = () => {
    switch (weather.weather[0].main) {
      case "Clear":
        return clear;
        break;

      case "Clouds":
        return clouds;
        break;

      case "Rain":
        return rain;
        break;

      case "Snow":
        return snow
        break;

      default:
        return clear;
        break;
    }
  }

  return (

    <>
      <div className="main flex justify-center min-h-screen items-center">
        {/* main card */}
        <div className=' h-120 w-100 rounded-2xl bg-[#74b2ff]'>

          <div className='flex justify-center items-center'>
            <input onKeyDown={(e) => {
              if (e.key == "Enter") {
                getWeather();
              }
            }} placeholder='Enter a  city name...' value={searchCity} onChange={(e) => setSearchCity(e.target.value)} className=' bg-white rounded-full p-2 m-5 w-80 ' type="search" name="" id="" />
            {/* sear icon  */}
            <button onClick={getWeather} className=' text-gray-600 bg-white rounded-full size-10 mr-5 justify-center flex  items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>
          </div>


          <div className="centerStuff flex flex-col items-center">

            {weather ? <img className='w-30 h-30 m-auto ' src={getWeatherIcon()} alt="" /> : <img className='w-30 h-30 m-auto ' src={clear} alt="" />}


            <h1 className='mt-10 text-4xl'>
              {weather ? weather.main.temp : '20°C'}

            </h1>
            {weather && (
              <div className='flex gap-3 text-gray-500 text-[15px] mt-3'>
                <p>min temp: {weather.main.temp_min}</p>
                <p>max temp: {weather.main.temp_max}</p>
              </div>
            )}

            <h2 className='text-2xl mt-5'>
              {weather ? weather.name : "New York"}
            </h2>



          </div>

          <div className="bottomStuff gap-x-10 flex justify-between ml-7 mr-7 mt-5">

            <div className="humidity py-2 px-3 flex items-center gap-2 border-2 rounded-2xl text-2xl">
              <div>
                <MdOutlineWaves />
              </div>

              <h1>
                {weather ? weather.main.humidity : "20"}
              </h1>

              <div>
                <p className=''>%</p>
                <p className='text-[15px]'>Humidity</p>
              </div>
            </div>


            <div className="windSpeed py-2 px-2 flex items-center border-2 rounded-2xl gap-2 text-2xl">

              <div className=''>
                < PiWindLight />
              </div>


              <h1>
                {weather ? weather.wind.speed : "20 "}
              </h1>
              <div>
                <p className=''>Km/hr</p>
                <p className='text-[15px]'>Wind Speed</p>
              </div>
            </div>

          </div>


        </div>
      </div>
    </>
  )
}

export default App
