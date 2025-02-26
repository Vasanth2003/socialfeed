import React, { useEffect, useState } from "react";
import { getAllPosts } from "../api/api";
import PostCard from "../components/PostCard";
import { Box, Typography, Container } from "@mui/material";
import { styled } from "@mui/system";

const HomeContainer = styled(Container)({
  minHeight: "100vh",
  paddingTop: "20px",
});

const Title = styled(Typography)({
  color: "#00f7ff",
  fontSize: "2.5rem",
  textAlign: "center",
  fontWeight: "bold",
  textShadow: "0 0 15px #00f7ff",
});

const NoPostsMessage = styled(Typography)({
  color: "#ff4d6d",
  fontSize: "1.3rem",
  textAlign: "center",
  marginTop: "20px",
  fontWeight: "bold",
});

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem("token");
      const response = await getAllPosts(token);
      setPosts(response || []);
    };

    fetchPosts();
  }, []);

  return (
    <HomeContainer maxWidth="md">
      <Title>🔥 Social Feed 🔥</Title>
      <Box mt={3}>
        {posts.length > 0 ? (
          posts.map((post, index) => <PostCard key={index} post={post || {}} />)
        ) : (
          <NoPostsMessage>No posts available 🚀</NoPostsMessage>
        )}
      </Box>
    </HomeContainer>
  );
};

export default Home;
