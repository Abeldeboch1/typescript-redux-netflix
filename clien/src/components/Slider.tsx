
import React from 'react';
import styled from 'styled-components';
import CardSlider from './CardSlider';

interface SliderProp {
  movies?: number | undefined;

}
export default function Slider({ movies }: SliderProp) {
  const getMoviesFromRange = (from: number, to: number) => {
    return movies?.slice(from, to);
  };
  return (
    <Container>
      <CardSlider data={getMoviesFromRange(0, 10)} title="Trending Now" movieData={{
        name: '',
        image: ''
      }} map={[]} index={undefined} />
      <CardSlider data={getMoviesFromRange(10, 20)} title="New Releases" movieData={{
        name: '',
        image: ''
      }} map={[]} index={undefined} />
      <CardSlider
        data={getMoviesFromRange(20, 30)}
        title="Blockbuster Movies" movieData={{
          name: '',
          image: ''
        }} map={[]} index={undefined}      />
      <CardSlider
        data={getMoviesFromRange(30, 40)}
        title="Popular on Netflix" movieData={{
          name: '',
          image: ''
        }} map={[]} index={undefined}      />
      <CardSlider data={getMoviesFromRange(40, 50)} title="Action Movies" movieData={{
        name: '',
        image: ''
      }} map={[]} index={undefined} />
      <CardSlider data={getMoviesFromRange(50, 60)} title="Epics" movieData={{
        name: '',
        image: ''
      }} map={[]} index={undefined} />
    </Container>
  );
}

const Container = styled.div``;
