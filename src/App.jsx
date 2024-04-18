import { useState, useEffect } from 'react';
import './App.css';

import ContactsList from './components/ContactsList/ContactsList'
import ContactForm from './components/ContactForm/ContactForm';
import SearchBox from './components/SearchBox/SearchBox';

const contactsList = [
  {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
  {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
  {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
  {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
]

function App() {

  const [nameToSearch, setNameToSearch] = useState("");

  const [contacts, setContacts] = useState(() => {
  const savedContacts = JSON.parse(localStorage.getItem("contacts"))

    if (savedContacts !== 0) {
      return savedContacts
    }

    return contactsList
  });
  
  const addContact = (newContact) => {
    newContact.id = Date.now()
    setContacts((prevContacts) => {
      return [...prevContacts, newContact]
    });
  }

  const deleteContact = (id) => {
    setContacts((prevContacts) => {
      return prevContacts.filter(contact => contact.id !== id)
    })}

  const filteredContacts = contacts.filter(contact => {
    return contact.name.toLowerCase().includes(nameToSearch.toLowerCase().trim())
  });  

  const handleChange = (event) => {
    setNameToSearch(event.target.value);
  };

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts))
    
    return () => {
      
    }
  },[contacts])

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm onAdd={addContact}></ContactForm>
      <SearchBox handleChange={handleChange}></SearchBox>
      <ContactsList data={filteredContacts} onDelete={deleteContact}></ContactsList>
    </>
  )
}

export default App
