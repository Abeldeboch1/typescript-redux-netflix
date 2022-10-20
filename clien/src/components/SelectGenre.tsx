import React, { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { fetchDataByGenre } from '../store/netflixSlice';

type SelectGenreProps = {
  genres?: string | any;
  type: string;
  map: [];
}
function SelectGenre({ genres, type }: SelectGenreProps) {
  const dispatch = useDispatch();
  return (
    <Select
      className='flex'
      onChange={(e) => {
        dispatch<any>(
          fetchDataByGenre({
            genre: e.target.value,
            type,
          })
        );
      }}
    >
      {genres.map((genre) => {
        return (
          <option value={genre.id} key={genre.id}>
            {genre.name}
          </option>
        );
      })}
    </Select>
  );
}
export default SelectGenre;

const Select = styled.select`
  margin-left: 5rem;
  cursor: pointer;
  font-size: 1.4rem;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
`;
