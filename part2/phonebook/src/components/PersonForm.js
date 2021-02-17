export default function PersonForm({
  newName,
  handleChangeName,
  newNumber,
  handleChangeNumber,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <p>
        Name: <input value={newName} onChange={handleChangeName} />
      </p>
      <p>
        Number: <input value={newNumber} onChange={handleChangeNumber} />
      </p>
      <button type="submit">Add</button>
    </form>
  );
}
