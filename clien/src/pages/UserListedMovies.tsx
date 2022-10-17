import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { firebaseAuth } from '../utils/firebase';
import Card from '../components/Card';
import Navbar from '../components/Navbar';
import { getUsersLikedMovies } from '../store/netflixSlice';
import { RootState } from '../store';

type UserListedMoviesProps = {
  movieData: {
    [x: string]: any;
    name: string;
    image: string;
    id?: [] | undefined;
  }
}
function UserListedMovies({ }: UserListedMoviesProps) {
  const movies = useSelector((state:RootState) => state.netflix.movies);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [email, setEmail] = useState('');

  onAuthStateChanged(firebaseAuth, (currentUser: User | any) => {
    if (currentUser&&currentUser) setEmail(currentUser.email);
    else navigate('/login');
  });

  useEffect(() => {
    if (email) {
      dispatch<any>(getUsersLikedMovies());
    }
  }, [email]);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="content flex column">
        <h1>My List</h1>
        <div className="grid flex">
          {movies?.map((movie, index) => {
            return (
              <Card
                movieData={movie}
                index={index}
                key={movie}
                isLiked={true}
              />
            );
          })}
        </div>
      </div>
    </Container>
  );
}
export default UserListedMovies;
const Container = styled.div`
  .content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    h1 {
      margin-left: 3rem;
    }
    .grid {
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
`;
