export default function Person({ name, number, id, handleDelete }) {
  return (
    <li key={name}>
      <span>
        {name} - {number}{" "}
      </span>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}
