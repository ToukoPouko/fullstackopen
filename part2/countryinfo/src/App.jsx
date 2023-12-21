import { useState, useEffect } from 'react'
import Search from "./components/Search"
import Countries from './components/Countries'
import countryService from "./services/countries"

function App() {
  const [currentSearch, setCurrentSearch] = useState("")
  const [countries, setCountries] = useState(null)
  const [showSingle, setShowSingle] = useState(null)



  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })

  }, [])

  if(!countries) {
    return null
  }

  const filteredCountries = countries.filter(country =>
    country.name.official.toLowerCase().includes(currentSearch.toLowerCase()) ||
    country.name.common.toLowerCase().includes(currentSearch.toLowerCase()))

  const handleSearchChange = (event) => {
    const newSearch = event.target.value
    setShowSingle(null)
    setCurrentSearch(newSearch)
  }

  const handleShow = country => {
    setShowSingle(country)
    setCurrentSearch("")
  }

  if (filteredCountries.length == 1 && !showSingle) {
    countryService
      .getCountry(filteredCountries[0].name.common)
      .then(country => {
        setShowSingle([country])
      })
  }

  return (
    <div>
      <Search term={currentSearch} handleSearch={handleSearchChange}/>
      <Countries filteredCountries={showSingle ? showSingle : filteredCountries} handleShow={handleShow}/>
    </div>
  )
}

export default App
