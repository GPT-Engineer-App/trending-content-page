// Update this page (the content is just a fallback if you fail and example)
// Use chakra-ui
import { Container, Text, VStack, Spinner, Box, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

// Example of using react-icons
// import { FaRocket } from "react-icons/fa";
// <IconButton aria-label="Add" icon={<FaRocket />} size="lg" />; // IconButton would also have to be imported from chakra

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [content, setContent] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('/api/most-watched-content');
        setContent(response.data.content);
      } catch (error) {
        setError('Error fetching data');
      }
      setLoading(false);
    };

    fetchData();
  }, []);
  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      {loading ? (
        <Spinner size="xl" />
      ) : error ? (
        <Text color="red.500">{error}</Text>
      ) : (
        <VStack spacing={4}>
          <Heading as="h1" size="xl">Most Watched Content</Heading>
          {content.map((item) => (
            <Box key={item.id} p={4} borderWidth="1px" borderRadius="md">
              <Text fontSize="2xl">{item.title}</Text>
              <Text>Views: {item.views}</Text>
              <Text>Rating: {item.rating}</Text>
              <Text>Date: {item.date}</Text>
            </Box>
          ))}
        </VStack>
      )}
    </Container>
  );
};

export default Index;
