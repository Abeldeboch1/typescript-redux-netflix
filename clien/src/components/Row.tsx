import React, { useState, useEffect } from 'react';
import './Row.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import axios from './axios';


const base_url = 'https://image.tmdb.org/t/p/original/';
interface RowProps {
  title: string;
  fetchUrl: string;
  isLargeRow?: boolean | '';

}

function Row({ title, fetchUrl, isLargeRow}: RowProps) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  const opts = {
    heighr: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    }
  }
  const handleClick = (movie: any) => {
    if(trailerUrl){
      setTrailerUrl('')
    }else {
      movieTrailer(movie.title || '')
      .then((url: string | URL) => {
        const urlParams = new URLSearchParams(new URL(url).search)
        setTrailerUrl(urlParams.get('v') || '')
      })
      .catch((error: any) => console.log(error))
    }
  }

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie: any) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path            
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      <div style={{ padding: "40px"}}>
    <YouTube videoId={trailerUrl} opts={opts} />
      </div>
    </div>
  );
}
export default Row;