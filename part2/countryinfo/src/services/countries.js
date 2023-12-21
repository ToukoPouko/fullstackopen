import axios from "axios"
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api"

const getAll = () => {
    const request = axios.get(`${baseUrl}/all`)
    console.log("Requested all");
    return request.then(response => response.data)
}

const getCountry = name => {
    const request = axios.get(`${baseUrl}/name/${name}`)
    console.log("Requested one");
    return request.then(response => response.data)
}

export default {
    getAll,
    getCountry
}
