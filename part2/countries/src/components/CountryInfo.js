import React, { useState, useEffect } from "react";

import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;

export default function CountryInfo({
  capital,
  flag,
  languages,
  name,
  population,
}) {
  const [weather, setWeather] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`;

  useEffect(() => {
    axios.get(url).then((json) => {
      const wind = json.data.current.wind_speed;
      const temp = json.data.current.temperature;
      const precip = json.data.current.precip;
      const icon = json.data.current.weather_icons;
      const weatherObject = {
        temperature: temp,
        wind: wind,
        precipitation: precip,
        icon: icon,
      };
      setWeather(weatherObject);
      setIsLoaded(true);
    });
  }, [url]);

  if (isLoaded) {
    return (
      <>
        <h1>{name}</h1>
        <p>Capital: {capital}</p>
        <p>Population: {population}</p>
        <h2>Languages</h2>
        <ul>
          {languages.map((language) => (
            <li key={language.iso639_2}>{language.name}</li>
          ))}
        </ul>
        <img src={flag} alt={name} />
        <h2>Weather in {capital}</h2>
        <p>
          <strong>temperature:</strong> {weather.temperature} Celsius
        </p>
        <img src={weather.icon[0]} alt={name} />
        <p>
          <strong>wind speed:</strong> {weather.wind} mph
        </p>
      </>
    );
  }
  return <p>Loading...</p>;
}
