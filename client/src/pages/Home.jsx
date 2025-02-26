import React, { useEffect, useState } from "react";
import { getAllPosts } from "../api/api";
import PostCard from "../components/PostCard";

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
    <div>
      <h1>Home Page</h1>
      {posts.length > 0 ? (
        posts.map((post, index) => <PostCard key={index} post={post || {}} />) // Ensures `post` is always valid
      ) : (
        <p>❌ No posts available</p>
      )}
    </div>
  );
};

export default Home;
