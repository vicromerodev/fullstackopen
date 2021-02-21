import Button from "./Button";

const CountryList = ({ name, setCountriesFilter }) => (
  <li>
    <span>{name} </span>
    <Button name={name} setCountriesFilter={setCountriesFilter} />
  </li>
);

export default CountryList;
