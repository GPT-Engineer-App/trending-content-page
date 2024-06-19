import React, { useEffect, useState } from 'react';
import { Box, Container, Heading, Select, VStack, Text, Spinner, HStack, Button } from '@chakra-ui/react';
import axios from 'axios';

const MostWatchedContent = () => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('views');
  const [weeklySummary, setWeeklySummary] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/most-watched-content', {
          params: { filter, sort },
        });
        setContent(response.data.content);
        setWeeklySummary(response.data.weeklySummary);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, [filter, sort]);

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
        </HStack>
        {loading ? (
          <Spinner size="xl" />
        ) : (
          <VStack spacing={4} align="stretch">
            {content.map((item) => (
              <Box key={item.id} p={4} borderWidth="1px" borderRadius="md">
                <Heading as="h3" size="md">{item.title}</Heading>
                <Text>Views: {item.views}</Text>
                <Text>Rating: {item.rating}</Text>
                <Text>Date: {item.date}</Text>
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