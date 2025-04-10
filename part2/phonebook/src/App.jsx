import { useState, useEffect } from 'react';
import personService from './services/persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    console.log('effect');
    personService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
    }).catch(error => {
      console.error('Error fetching data:', error);
    }
    )
  }, [])

  const handleSearchChange = (event) => setSearchTerm(event.target.value);
  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);

  const addPerson = (event) => {
    event.preventDefault();

    const existingPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase());

    if (existingPerson) {
      const confirmUpdate = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        personService.update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson));
            setNewName('');
            setNewNumber('');
          })
          .catch(error => {
            console.error('Error updating person:', error);
            alert(`Failed to updated ${existingPerson.name}. They may have already been removed.`);
          });
      }
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
      // id: persons.length + 1 //Remove `id` here; let the server generate it
    };
    personService.create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
      })
      .catch(error => {
        console.error('Error adding person:', error);
      })
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
        })
        .catch(error => {
          console.error('Error deleting person:', error);
          alert(`Failed to delete ${name}. They may have already been removed.`)
        });
    }
  };

  // Filter persons based on search term (case-insensitive)
  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      
      <h3>Add a new</h3>
      <PersonForm 
        newName={newName} 
        newNumber={newNumber} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} 
        addPerson={addPerson} 
      />

      <h3>Numbers</h3>
      <Persons key={persons.id} persons={personsToShow} onDelete={handleDelete} />
    </div>
  );
}

export default App