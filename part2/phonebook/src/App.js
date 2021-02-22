import React, { useState, useEffect } from "react";

import Person from "./components/Person";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";

import { getData, postData, putData, deleteData } from "./services/handleData";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [notification, setNotification] = useState(null);
  const [succeed, setSucceed] = useState(true);

  const getPersons = () => {
    getData().then((data) => setPersons(data));
  };

  useEffect(getPersons, []);

  const contactsToShow = filterName
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filterName.toLowerCase())
      )
    : persons.concat();

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameRepeated =
      persons.findIndex((person) => person.name === newName) !== -1;
    if (nameRepeated) {
      const confirm = window.confirm(
        `${newName} is already added to phonebook, replace the old number with the new one?`
      );
      if (confirm) {
        const contact = persons.find((person) => person.name === newName);
        const newContact = { ...contact, number: newNumber };
        putData(contact.id, newContact).then((res) => {
          const newData = persons.map((person) =>
            person.id !== res.id ? person : res
          );
          setNotification(`Added ${newContact.name}`);
          setPersons(newData);
          setNewName("");
          setNewNumber("");
          setSucceed(true);
        });
      }
    } else {
      const newPerson = { name: newName, number: newNumber };
      postData(newPerson).then((response) => {
        setPersons(persons.concat(response));
      });
      setNotification(`Added ${newPerson.name} to the phonebook`);
      setNewName("");
      setNewNumber("");
      setSucceed(true);
    }
  };

  const handleChangeName = (e) => {
    setNewName(e.target.value);
  };

  const handleChangeNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilter = (e) => {
    setFilterName(e.target.value);
  };

  const handleDelete = (id, name) => {
    const confirm = window.confirm("Do you want to delete this contact?");
    if (confirm) {
      deleteData(id).catch((error) => {
        console.log(error);
        setSucceed(false);
        setNotification(
          `Information from ${name} has already been removed from server.`
        );
      });
      const newData = persons.filter((person) => person.id !== id);
      setPersons(newData);
    }
  };

  return (
    <>
      {succeed ? (
        <Notification message={notification} />
      ) : (
        <Notification message={notification} error />
      )}
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} inputValue={filterName} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        handleChangeName={handleChangeName}
        newNumber={newNumber}
        handleChangeNumber={handleChangeNumber}
        handleSubmit={handleSubmit}
      />
      <h3>Numbers</h3>
      <ul>
        {contactsToShow.map((contact) => (
          <Person
            name={contact.name}
            number={contact.number}
            id={contact.id}
            key={contact.id}
            handleDelete={() => handleDelete(contact.id, contact.name)}
          />
        ))}
      </ul>
    </>
  );
};

export default App;
