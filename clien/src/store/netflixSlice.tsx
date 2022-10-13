import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '.';
import { API_KEY, TMDB_BASE_URL } from '../utils/constants';
interface netflix {
  [x: string]: any;
  genresLoaded: boolean;
}
interface movie { 
  id: number;
  name: string;
  image: string;
  genres: string;
  setGenres: {};
  setMovies: {};
}
// interface netflix {
//   movie?: movie[];
//   genresLoaded: boolean;
// }
const initialState: netflix = {
  movies: [],
  genresLoaded: false,
  genres: [],
  
};

export const getGenres = createAsyncThunk("netflix/genres", async () => {
  const {
    data: { genres },
  } = await axios.get(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=e655ce749b6e9689364799559f652abc"
  );
  return genres;
});
export const createArrayFromRawData = (array: any[], moviesArray: any[], genres: any[]) => {
  array.forEach((movie: { genre_ids: any[]; backdrop_path: any; id: any; original_name: any; original_title: any; }) => {
    const movieGenres: any[] = [];
    movie.genre_ids.forEach((genre: any) => {
      const name = genres.find(({ id }) => id === genre);
      if (name) movieGenres.push(name.name);
    });
    if (movie.backdrop_path)
      moviesArray.push({
        id: movie.id,
        name: movie?.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        genres: movieGenres.slice(0, 3),
      });
    
  });
};
const getRawData = async (api, genres, paging = false) => {
  const moviesArray = [];
  for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
    const {
      data: { results },
    } = await axios.get(`${api}${paging ? `&page=${i}` : ''}`);
    createArrayFromRawData(results, moviesArray, genres);
  }
  return moviesArray;
};
type TypeProps = {
  genre: string;
  type: string;
}
export const fetchDataByGenre = createAsyncThunk <movie[], TypeProps, {state: RootState}>(
  "netflix/genre",
  async ({ genre, type }: TypeProps, thunkAPI) => {
    const {
      netflix: { genres },
    } = thunkAPI.getState();
    return getRawData(
      `https://api.themoviedb.org/3/discover/${type}?api_key=e655ce749b6e9689364799559f652abc&with_genres=${genre}`,
      genres
    );
  }
);
export const fetchMovies = createAsyncThunk < movie[],
  { genres: string[]; type: string},

  { state: RootState }>(
  'netflix/trending',
  async ({ type }: any, thunkAPI) => {
    const {
      netflix: { genres },
    } = thunkAPI.getState();
    return getRawData(
      `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
      genres,
      true
    );
  }
);
export const getUsersLikedMovies = createAsyncThunk(
  'type-redux/getLiked',
  async (email) => {
    const {
      data: { movies },
    } = await axios.get(`http://localhost:5000/api/user/liked/${email}`);
    return movies;
  }
);

export const removeMovieFromLiked = createAsyncThunk(
  'type-redux/deleteLiked',
  async ({ movieId, email }: any) => {
    const {
      data: { movies },
    } = await axios.put("http://localhost:5000/api/user/remove", {
      email,
      movieId,
    });
    return movies;
  }
);

export const netflixSlice = createSlice({
  name: 'netflix',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(getUsersLikedMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(removeMovieFromLiked.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
  },
  reducers: {}
});

export const { setGenres, setMovies } = netflixSlice.actions;
export default netflixSlice.reducer;
