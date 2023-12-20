import React from "react"
import Person from "./Person"

const Persons = ({filteredPersons}) => {
    return (
        <>
        {filteredPersons.map(person => <Person name={person.name} number={person.number}/>)}
        </>
    )
}

export default Persons
