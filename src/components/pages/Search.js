import SearchBox from '../layouts/SearchBox';

const Search = () => {
  return (
    <div className='Search'>
      <div className='page-container'>
        <header className='page-header'>
          <h2 className='page-title'>Search</h2>
        </header>
        <SearchBox />
      </div>
    </div>
  );
};

export default Search;
