import { useState, useEffect } from 'react'
import axios from "axios"
import personsService from "./services/persons"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [currentFilter, setCurrentFilter] = useState("")
  const [notifMessage, setNotifMessage] = useState("")
  const [notifType, setNotifType] = useState("success")

  useEffect(() => {
    console.log("effect")
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const foundPerson = persons.find(person => person.name === newName)
    if (foundPerson !== undefined) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personsService
          .update(foundPerson.id, {...foundPerson, number: newNumber})
          .then(returnedPerson => {
            setPersons(persons.map(person => person.name !== newName ? person : returnedPerson))
            setNotifType("notification")
            setNotifMessage(
              `Edited ${foundPerson.name}'s number from ${foundPerson.number} to ${newNumber}`
            )
            setTimeout(() => {
              setNotifMessage("")
            }, 4000)
          })
          .catch(error => {
            setNotifType("error")
            setNotifMessage(
              `Information of ${foundPerson.name} has already been removed from the server`
            )
            setTimeout(() => {
              setNotifMessage("")
            }, 4000)
          })
      }
      return
    }
    const nameObject = {
      name: newName,
      number: newNumber
    }

    personsService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNotifType("notification")
        setNotifMessage(
          `Added ${nameObject.name}`
        )
        setTimeout(() => {
          setNotifMessage("")
        }, 2000)
      })

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    const newFilter = event.target.value
    setCurrentFilter(newFilter)
  }

  const handleDelete = id => {
    const person = persons.find(n => n.id === id)
    const index = persons.indexOf(person)
    //const newPersons = index > -1 ? persons.splice(index, 1) : persons
    if(window.confirm(`Delete ${person.name}?`)) {
      personsService
        .deletePerson(person.id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setNotifType("notification")
            setNotifMessage(
              `Deleted ${person.name}`
            )
            setTimeout(() => {
              setNotifMessage("")
            }, 4000)
        })
        .catch(error => {
          setNotifType("error")
          setNotifMessage(
            `Information of ${person.name} has already been removed from the server`
          )
          setTimeout(() => {
            setNotifMessage("")
          }, 4000)
        })
    }
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(currentFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notifMessage} type={notifType}/>
      <Filter filter={currentFilter}
        handleFilter={handleFilterChange}/>
      <h3>Add a new person</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleName={handleNameChange}
        newNumber={newNumber}
        handleNumber={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete}/>
    </div>
  )
}

export default App
