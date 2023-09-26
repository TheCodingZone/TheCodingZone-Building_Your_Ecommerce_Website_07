import React, { useState } from 'react';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const[message,showMessage]=useState(false); 
  const[isLoding,setIsLoding]=useState(false);

  async function fetchMoviesHandler() {
    setIsLoding(true);
    try {
      
      const response = await fetch('https://swapi.dev/api/films/');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      else if(response.ok){
        setIsLoding(false);
      }
      
      const data = await response.json();

      const transformedMovies = data.results.map(movieData => ({
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date
      }));

      setMovies(transformedMovies);   
    } catch (error) {
      // Handle errors here
      console.error('Error fetching movies:', error);
    }
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      
      { isLoding &&
         <div>LODING THE DETAILS...</div>}
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
