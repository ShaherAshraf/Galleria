import { useState, useRef, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState(null);
  const [results, setResults] = useState(null);
  const resultsBoxRef = useRef();
  const history = useHistory();
  const headerResults = document.querySelector('.Header .resultsBox');

  const handleSubmit = (e) => {
    e.preventDefault();
    headerResults.style.display = `none`;
    history.push('/search');
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    axios.get(`https://api.artic.edu/api/v1/artworks/search?q=${searchTerm}`).then((res) => {
      setResults(res.data.data);
      resultsBoxRef.current.style.display = 'block';
      const searchBox = document.querySelector('.Search .SearchBox');
      if (searchBox) {
        searchBox.style.height = '20vh';
      }
      if (!searchTerm || !searchTerm.trim() || searchTerm.length <= 1) {
        setResults(null);
        resultsBoxRef.current.style.display = 'none';
        if (searchBox) {
          searchBox.style.height = '60vh';
        }
      }
    });
  };

  useEffect(() => {
    if (resultsBoxRef.current != undefined) {
      resultsBoxRef.current.style.display = 'none';
    }
  }, [searchTerm]);

  return (
    <>
      <div className='SearchBox'>
        <form className='search-form' onSubmit={handleSubmit}>
          <input
            type='text'
            className='search-txtField'
            onKeyUp={handleChange}
            onBlur={() => {
              resultsBoxRef.current.style.opacity = 0;
            }}
            onFocus={() => {
              resultsBoxRef.current.style.opacity = 1;
            }}
            placeholder='Artists, artworks, or articles'
            required
          />
          <button className='search-submit' type='submit'>
            <span className='material-icons'>search</span>
          </button>
        </form>
      </div>
      <ul className='resultsBox' ref={resultsBoxRef}>
        {results &&
          results.map((result) => (
            <li key={result.id} className='result'>
              <Link
                to={`/artwork/${result.id}`}
                onClick={() => {
                  if (headerResults) {
                    headerResults.style.display = `none`;
                  }
                }}
              >
                {result.title}
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export default SearchBox;
