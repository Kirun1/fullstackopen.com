const Filter = ({ searchTerm, handleSearchChange }) => {
  return (
    <div>
      Filter shown with <input value={searchTerm} onChange={handleSearchChange} />
    </div>
  );
};

export default Filter;
