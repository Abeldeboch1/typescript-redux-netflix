import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../components/Navbar';
import CardSlider from '../components/CardSlider';
import { firebaseAuth } from '../utils/firebase';
import { fetchMovies, getGenres } from '../store/netflixSlice';
import SelectGenre from '../components/SelectGenre';
import Slider from '../components/Slider';
import { RootState } from '../store';

function TVShows() {
  const [isScrolled, setIsScrolled] = useState(false);
  const movies = useSelector((state:RootState) => state.netflix.movies);
  const genres = useSelector((state:RootState) => state.netflix.genres);
  const genresLoaded = useSelector((state:RootState) => state.netflix.genresLoaded);
  const dataLoading = useSelector((state:RootState) => state.netflix.dataLoading);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!genres?.length) dispatch<any>(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch<any>(fetchMovies);
    }
  }, [genresLoaded]);

  const [user, setUser] = useState('');

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setUser(currentUser.uid);
    else navigate('/login');
  });

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll == null);
  };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="data">
        <SelectGenre genres={genres} type="tv" map={[]} />
        {movies?.length ? (
          <>
            <Slider movies={movies} />
          </>
        ) : (
          <h1 className="not-available">
            No TV Shows avaialble for the selected genre. Please select a
            different genre.
          </h1>
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  .data {
    margin-top: 8rem;
    .not-available {
      text-align: center;
      margin-top: 4rem;
    }
  }
`;
export default TVShows;
