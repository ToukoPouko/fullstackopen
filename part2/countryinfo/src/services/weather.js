import axios from "axios"

const api_key = import.meta.env.VITE_SOME_KEY
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?q="

const getWeather = (city, country) => {
    console.log(`Requested ${city} ${country}`)
    if(city === undefined || country === undefined) {
        return
    }
    const request = axios.get(`${baseUrl}${city},${country}&appid=${api_key}&units=metric`)
    return request.then(response => response.data)
}

export default {
    getWeather
}
