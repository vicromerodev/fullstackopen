const Button = ({ name, setCountriesFilter }) => (
  <button onClick={() => setCountriesFilter(name)}>show</button>
);

export default Button;
