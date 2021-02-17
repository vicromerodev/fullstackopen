export default function Person({ contacts }) {
  console.log(contacts);
  return (
    <ul>
      {contacts.map((person) => (
        <li key={person.name}>
          {person.name} - {person.number}
        </li>
      ))}
    </ul>
  );
}
