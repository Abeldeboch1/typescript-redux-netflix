import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import axios from './axios';
import styled from 'styled-components';


const base_url = 'https://image.tmdb.org/t/p/original/';
interface DetailProps {
  title: string;
  fetchUrl: string;
  isLargeRow?: boolean | '';

}

function Detail({ title, fetchUrl, isLargeRow }: DetailProps) {
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
    if (trailerUrl) {
      setTrailerUrl('')
    } else {
      movieTrailer(movie.title || '')
        .then((url: string | URL) => {
          const urlParams = new URLSearchParams(new URL(url).search)
          setTrailerUrl(urlParams.get('v') || '')
        })
        .catch((error: any) => console.log(error))
    }
  }

  return (
  <StyledDetail className='row'>
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie: any) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
            alt={movie.name}
          />
        ))}
      </div>
      <div style={{ padding: "40px" }}>
        <YouTube videoId={trailerUrl} opts={opts} />
      </div>
</StyledDetail>
  );
}
export default Detail;

const StyledDetail = styled.div`
.row {
  margin-left: 20px;
  color: white;
}
.row__poster {
  width: 100%;
  object-fit: contain;
  max-height: 100px;
  transition: transform 450ms;
  margin-right: 10px;
}
.row__posters {
  display: flex;
  overflow-y: hidden;
  overflow-x: scroll;
  padding: 20px;
}
.row__posters::-webkit-scrollbar {
  display: none;
}
.row__poster:hover {
  transform: scale(1.08);
  /* opacity: 1.2; */
}
.row__posterLarge {
  max-height: 250px;
}
.row__posterLarge:hover {
  transform: scale(1.09);
  opacity: 1;
}
`;
