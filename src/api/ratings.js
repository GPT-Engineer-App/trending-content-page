import axios from 'axios';

const RAPIDAPI_KEY = process.env.REACT_APP_RAPIDAPI_KEY;
const IMDB_API_KEY = process.env.REACT_APP_IMDB_API_KEY;

const getRottenTomatoesRating = async (title) => {
  try {
    const response = await axios.get('https://api.example.com/rotten-tomatoes', {
      headers: {
        'x-rapidapi-key': RAPIDAPI_KEY,
      },
      params: {
        title,
      },
    });
    return response.data.rating;
  } catch (error) {
    console.error('Error fetching Rotten Tomatoes rating:', error);
    return null;
  }
};

const getImdbRating = async (title) => {
  try {
    const response = await axios.get(`https://imdb-api.com/en/API/SearchTitle/${IMDB_API_KEY}/${title}`);
    return response.data.results[0].imDbRating;
  } catch (error) {
    console.error('Error fetching IMDb rating:', error);
    return null;
  }
};

export { getRottenTomatoesRating, getImdbRating };