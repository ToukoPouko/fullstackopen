import React from "react"
import Country from "./Country"
import Weather from "./Weather"

const Countries = ({filteredCountries, handleShow}) => {
	if(filteredCountries.length == 1) {
		return (
			<>
					<Country info={filteredCountries[0]}/>
					<Weather country={filteredCountries[0]}/>
			</>
		)
	} else if(filteredCountries.length >= 10) {
			return (
				<>
						<p>Too many matches, specify another filter</p>
				</>
			)
	}

	return (
		<>
			{filteredCountries.map(country =>
			<div key={country.name.official}>
				{country.name.common}
				<button onClick={() => handleShow([country])}>show</button>
			</div>
			)}
		</>
	)
}

export default Countries
