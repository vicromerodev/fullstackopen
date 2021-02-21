import React, { useState, useEffect } from "react";

import CountryInfo from "./components/CountryInfo";

import axios from "axios";
import CountryList from "./components/CountryList";

function App() {
  const [countriesList, setCountriesList] = useState([]);
  const [countriesFilter, setCountriesFilter] = useState("");
  const [showCountries, setShowCountries] = useState(false);

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((json) => setCountriesList(json.data));
  }, []);

  useEffect(() => {
    countriesFilter === "" ? setShowCountries(false) : setShowCountries(true);
  }, [countriesFilter]);

  const handleFilter = (e) => {
    setCountriesFilter(e.target.value);
  };

  const filteredCountries = countriesList.filter((country) =>
    country.name.toLowerCase().includes(countriesFilter.toLowerCase())
  );

  const checkCountries = () => {
    if (showCountries === false) return;
    if (filteredCountries.length > 10)
      return <p>Too many matches, specify another filter</p>;
    if (filteredCountries.length === 1) {
      const country = { ...filteredCountries[0] };
      return (
        <CountryInfo
          capital={country.capital}
          flag={country.flag}
          languages={country.languages}
          name={country.name}
          population={country.population}
        />
      );
    }
    return (
      <ul>
        {filteredCountries.map((country) => (
          <CountryList
            key={country.numericCode}
            name={country.name}
            setCountriesFilter={setCountriesFilter}
          />
        ))}
      </ul>
    );
  };

  return (
    <>
      Find countries: <input onChange={handleFilter} value={countriesFilter} />
      {checkCountries()}
    </>
  );
}

export default App;
