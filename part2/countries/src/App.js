import React, { useState, useEffect } from "react";

function App() {
  let [countriesList, setCountriesList] = useState([]);
  const [nameFilter, setNameFilter] = useState("");

  const filteredCountries = countriesList.filter((country) =>
    country.name.includes(nameFilter)
  );

  const countriesToShow =
    filteredCountries.length > 10 ? [].concat() : filteredCountries.concat();

  const getData = () => {
    fetch("https://restcountries.eu/rest/v2/all")
      .then((res) => res.json())
      .then((data) => setCountriesList(countriesList.concat(data)));
  };

  const handleFilter = (e) => {
    setNameFilter(e.target.value);
  };

  useEffect(getData, []);

  if (filteredCountries.length === 1) {
    return (
      <>
        Find countries: <input onChange={handleFilter} value={nameFilter} />
        <h1>{countriesToShow[0].name}</h1>
        <p>Capital: {countriesToShow[0].capital}</p>
        <p>Population: {countriesToShow[0].population}</p>
        <h2>Languages</h2>
        <ul>
          {countriesToShow[0].languages.map((language) => (
            <li key={language.iso639_2}>{language.name}</li>
          ))}
        </ul>
        <img src={countriesToShow[0].flag} alt={countriesToShow[0].name} />
      </>
    );
  }

  return (
    <>
      Find countries: <input onChange={handleFilter} value={nameFilter} />
      <h1>Countries List</h1>
      {countriesToShow.map((country) => (
        <p key={country.numericCode}>{country.name}</p>
      ))}
    </>
  );
}

export default App;
