import React from "react"
import Person from "./Person"

const Persons = ({filteredPersons, handleDelete}) => {
    return (
        <>
            {filteredPersons.map(person => <Person key={person.name} name={person.name} number={person.number} handleDelete={() => handleDelete(person.id)}/>)}
        </>
    )
}

export default Persons
