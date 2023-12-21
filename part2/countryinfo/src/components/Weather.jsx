import React from "react"
import { useState, useEffect } from "react"
import weatherService from "../services/weather"

const Weather = ({country}) => {
  const [currentWeather, setWeather] = useState(null)

  useEffect(() => {
    weatherService
    .getWeather(country.capital[0], country.cca2)
    .then(data => {
      const weatherObject = {
        temperature: data.main.temp,
        wind: data.wind.speed,
        img: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      }
      setWeather(weatherObject)
    })
  }, [])

  if(!currentWeather) {
    return null
  }

  return (
    <div>
      <h2>Weather in {country.capital[0]}</h2>
      <p>Temperature is {currentWeather.temperature} Celcius</p>
      <p>Wind is {currentWeather.wind} m/s</p>
      <img src={currentWeather.img}/>
    </div>
  )
}

export default Weather
