import { useState, useEffect } from 'react';
import personService from './services/persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState({ message: null, type: null });

  useEffect(() => {
    console.log('effect');
    personService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
    }).catch(error => {
      console.error('Error fetching data:', error);
      showNotification(`Error fetching data: ${error.message}`, 'error');
    }
    )
  }, [])

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: null, type: null });
    }
    , 5000);
  };

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
            showNotification(`Updated ${newName}'s number`, 'success');
            setNewName('');
            setNewNumber('');
          })
          .catch(error => {
            if (error.response && error.response.status === 404) {
              showNotification(`Information of ${existingPerson.name} has already been removed from server`, 'error');
              // Remove the deleted person from the state
              setPersons(persons.filter(person => person.id !== existingPerson.id));
            } else {
              showNotification(`Failed to update ${newName}.`, 'error');
            }
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
        showNotification(`Added ${newName}`, 'success');
        setNewName('');
        setNewNumber('');
      })
      .catch(error => {
        console.error('Error adding person:', error);
        showNotification(`Failed to add ${newName}.`, 'error');
      })
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
          showNotification(`Deleted ${name}`, 'success');
        })
        .catch(error => {
          // Handle error if person was already deleted
          if (error.response && error.response.status === 404) {
            showNotification(`Information of ${name} has already been removed from server`, 'error');
            // Remove the deleted person from the state
            setPersons(persons.filter(person => person.id !== id));
          } else { // Handle other errors
            showNotification(`Failed to delete ${name}.`, 'error');
          }
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
      <Notification message={notification.message} type={notification.type} />
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