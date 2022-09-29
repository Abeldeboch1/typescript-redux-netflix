import { strict } from 'assert';
import { string } from 'prop-types';
import React, { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { fetchDataByGenre } from '../store/netflixSlice';

type SelectGenreProps = {
  genres: string;
  type: string;
  fetchDataByGenre: { 
    genres?: string | undefined;
    type?: string | undefined;
  };
  map?: [];
}
export default function SelectGenre({ genres, type, fetchDataByGenre }: SelectGenreProps) {
  const dispatch = useDispatch();
  return (
    <Select
      className="flex"
      onChange={(e) => {
        dispatch(
          fetchDataByGenre({
            genres,
            genre: e.target.value,
            type,
          })
        );
      }}
    >
      {genres.map((genre: any) => {
        return (
          <option value={genre.id} key={genre.id}>
            {genre.name}
          </option>
        );
      })}
    </Select>
  );
}

const Select = styled.select`
  margin-left: 5rem;
  cursor: pointer;
  font-size: 1.4rem;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
`;
