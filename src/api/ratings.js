import axios from 'axios';

const OMDB_API_KEY = process.env.REACT_APP_OMDB_API_KEY;
const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const getOmdbData = async (title) => {
  try {
    const response = await axios.get(`http://www.omdbapi.com/?t=${title}&apikey=${OMDB_API_KEY}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching OMDb data:', error);
    return null;
  }
};

const getTmdbData = async (title) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${title}`);
    return response.data.results[0];
  } catch (error) {
    console.error('Error fetching TMDb data:', error);
    return null;
  }
};

export { getOmdbData, getTmdbData };