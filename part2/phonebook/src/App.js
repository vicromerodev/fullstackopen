import React, { useState, useEffect } from "react";

import Person from "./components/Person";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  const getData = () => {
    axios
      .get("http://localhost:3001/persons")
      .then((res) => setPersons(persons.concat(res.data)));
  };

  useEffect(getData, []);

  const contactsToShow = filterName
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filterName.toLowerCase())
      )
    : persons.concat();

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameRepeated =
      persons.findIndex((person) => person.name === newName) !== -1;
    if (nameRepeated) return alert(`${newName} is already added to phonebook`);
    const newPersons = { name: newName, number: newNumber };
    setPersons(persons.concat(newPersons));
    setNewName("");
    setNewNumber("");
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

  return (
    <>
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
      <Person contacts={contactsToShow} />
    </>
  );
};

export default App;
