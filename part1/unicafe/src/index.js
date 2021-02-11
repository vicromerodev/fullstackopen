import React, { useState } from "react";
import ReactDOM from "react-dom";

const Heading = ({ text }) => <h1>{text}</h1>;

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
);

const Stadistic = ({ value, text }) => (
  <tr>
    <td>{value}</td>
    <td>{text}</td>
  </tr>
);

const Stadistics = ({ values }) => {
  const { good, neutral, bad, all, average, positive } = values;
  return all ? (
    <table>
      <tbody>
        <Stadistic value={"good"} text={good} />
        <Stadistic value={"neutral"} text={neutral} />
        <Stadistic value={"bad"} text={bad} />
        <Stadistic value={"all"} text={all} />
        <Stadistic value={"average"} text={average} />
        <Stadistic value={"positive"} text={positive} />
      </tbody>
    </table>
  ) : (
    <p>No feedback given</p>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + bad + neutral;
  const average = Math.round(((good - bad) / all) * 10) / 10;
  const positive = Math.round((good / all) * 10000) / 100 + " %";

  const handleGood = () => setGood(good + 1);
  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => setBad(bad + 1);

  return (
    <>
      <Heading text={"give feedback"} />
      <Button handleClick={handleGood} text={"good"} />
      <Button handleClick={handleNeutral} text={"neutral"} />
      <Button handleClick={handleBad} text={"bad"} />
      <Heading text={"stadistics"} />
      <Stadistics
        values={{
          good,
          neutral,
          bad,
          all,
          average,
          positive,
        }}
      />
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
