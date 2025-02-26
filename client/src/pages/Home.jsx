import React, { useEffect, useState } from "react";
import { getAllPosts } from "../api/api";
import PostCard from "../components/PostCard";
import CreatePost from "../components/CreatePost";

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


  const handleNewPost = (newPost) => {
    setPosts([newPost, ...posts]); // Add new post to UI
  };

  return (
    <div>

<CreatePost onPostCreated={handleNewPost} />


      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      {posts.length > 0 ? (
        posts.map((post, index) => <PostCard key={index} post={post || {}} />) // Ensures `post` is always valid
      ) : (
        <p>❌ No posts available</p>
      )}

      
    </div>
  );
};

export default Home;
