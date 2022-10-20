import React from 'react';
import Detail from './Detail';
import requests from './requests';

function Request() {
  return (
    <div>
      <Detail
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Detail title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Detail title="Top Rated" fetchUrl={requests.fetchTopRatedMovies} />
      <Detail title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Detail title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Detail title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Detail title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Detail
        title="Documentaries Movies"
        fetchUrl={requests.fetchDocumentaries}
      />
    </div>
  );
}

export default Request;