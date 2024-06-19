import React, { useEffect, useState } from 'react';
import { Box, Container, Heading, Select, VStack, Text, Spinner, HStack } from '@chakra-ui/react';
import axios from 'axios';
import { getOmdbData, getTmdbData } from '../api/ratings';

const MostWatchedContent = () => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('views');
  const [weeklySummary, setWeeklySummary] = useState(null);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('/api/most-watched-content', {
          params: { filter, sort },
        });
        if (response.data && response.data.content) {
          const contentWithRatings = await Promise.all(response.data.content.map(async (item) => {
            const omdbData = await getOmdbData(item.title);
            const tmdbData = await getTmdbData(item.title);
            return { ...item, omdbData, tmdbData };
          }));
          setContent(contentWithRatings);
          setWeeklySummary(response.data.weeklySummary);
        } else {
          setError('No content data available');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      }
      setLoading(false);
    };

    fetchData();
  }, [filter, sort]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get('/api/genres');
        setGenres(response.data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  return (
    <Container maxW="container.lg" py={8}>
      <VStack spacing={4} align="stretch">
        <Heading as="h1" size="xl" textAlign="center">Most Watched Content</Heading>
        <HStack spacing={4} justify="center">
          <Select value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Filter by">
            <option value="all">All</option>
            <option value="movies">Movies</option>
            <option value="shows">Shows</option>
          </Select>
          <Select value={sort} onChange={(e) => setSort(e.target.value)} placeholder="Sort by">
            <option value="views">Views</option>
            <option value="rating">Rating</option>
            <option value="date">Date</option>
          </Select>
          <Select value={selectedGenre} onChange={handleGenreChange} placeholder="Select genre">
            {genres.map((genre) => (
              <option key={genre.id} value={genre.name}>{genre.name}</option>
            ))}
          </Select>
        </HStack>
        {loading ? (
          <Spinner size="xl" />
        ) : error ? (
          <Text color="red.500">{error}</Text>
        ) : (
          <VStack spacing={4} align="stretch">
            {content.map((item) => (
              <Box key={item.id} p={4} borderWidth="1px" borderRadius="md">
                <Heading as="h3" size="md">{item.title}</Heading>
                <Text>Views: {item.views}</Text>
                <Text>Rating: {item.rating}</Text>
                <Text>Date: {item.date}</Text>
                {item.omdbData && (
                  <>
                    <Text>OMDb Plot: {item.omdbData.Plot}</Text>
                    <Text>OMDb Actors: {item.omdbData.Actors}</Text>
                  </>
                )}
                {item.tmdbData && (
                  <>
                    <Text>TMDb Overview: {item.tmdbData.overview}</Text>
                    <Text>TMDb Release Date: {item.tmdbData.release_date}</Text>
                  </>
                )}
              </Box>
            ))}
          </VStack>
        )}
        {weeklySummary && (
          <Box p={4} borderWidth="1px" borderRadius="md" mt={8}>
            <Heading as="h2" size="lg">Weekly Summary</Heading>
            <Text>{weeklySummary}</Text>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default MostWatchedContent;