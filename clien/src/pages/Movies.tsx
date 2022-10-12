import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { onAuthStateChanged} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../components/Navbar';
import { firebaseAuth } from '../utils/firebase';
import { fetchMovies, getGenres } from '../store/netflixSlice';
import SelectGenre from '../components/SelectGenre';
import Slider from '../components/Slider';
import NotAvailable from '../components/NotAvailable';
import { RootState } from '../store';

function MoviePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const movies = useSelector((state:RootState) => state.netflix.movies);
  const genres = useSelector((state:RootState) => state.netflix.genres);
  const genresLoaded = useSelector((state:RootState) => state.netflix.genresLoaded);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch<any>(fetchMovies);
    }
  }, [genresLoaded]);

  const [user, setUser] = useState('');

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setUser(currentUser.uid);
    else navigate("/login");
  });

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <div className="navbar">
        <Navbar isScrolled={isScrolled} />
      </div>
      <div className="data">
        <SelectGenre genres={genres} type="movie" map={[]} />
        {movies?.length ? <Slider movies={movies} /> : <NotAvailable />}
      </div>
    </Container>
  );
}

const Container = styled.div`
  .data {
    margin-top: 8rem;
    .not-available {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
  }
`;
export default MoviePage;
