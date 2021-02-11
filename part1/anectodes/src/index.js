import React, { useState } from "react";
import ReactDOM from "react-dom";

const Heading = ({ text }) => <h1>{text}</h1>;

const Anecdotes = ({ anecdote, votes }) => (
  <>
    <p>{anecdote}</p>
    <p>has {votes} votes</p>
  </>
);

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const App = ({ anecdotes }) => {
  const votes = Array(anecdotes.length).fill(0);
  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(votes);

  const maxVotes = [...vote].sort((a, b) => b - a)[0];
  const mostVoted = [...vote].indexOf(maxVotes);

  const randomIndex = () => {
    const random = Math.floor(Math.random() * anecdotes.length);
    if (random === selected) return randomIndex();
    return random;
  };

  const handleNext = () => {
    setSelected(randomIndex);
  };

  const handleVote = () => {
    const copyVotes = [...vote];
    copyVotes[selected] += 1;
    setVote(copyVotes);
  };

  return (
    <>
      <Heading text={"Anecdote of the day"} />
      <Anecdotes anecdote={anecdotes[selected]} votes={vote[selected]} />
      <Button handleClick={handleVote} text={"vote"} />
      <Button handleClick={handleNext} text={"next anecdote"} />
      <Heading text={"Anecdote with most votes"} />
      {maxVotes ? (
        <Anecdotes anecdote={anecdotes[mostVoted]} votes={vote[mostVoted]} />
      ) : (
        <p>No votes given yet</p>
      )}
    </>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
