export default function Filter({ handleFilter, filterName }) {
  return <input onChange={handleFilter} value={filterName} />;
}
