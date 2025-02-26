import axios from "axios";

const API_URL = "http://localhost:5000/api";
const API_URL_POSTS = "http://localhost:5000/api/posts";

const API_URL_AUTH = "http://localhost:5000/api/auth";

export const signup = (userData) => axios.post(`${API_URL}/auth/signup`, userData);
export const login = (userData) => axios.post(`${API_URL}/auth/login`, userData);

export const getAllPosts = async (token) => {
  try {
    const response = await axios.get(`${API_URL_POSTS}/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("✅ Posts API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching posts:", error.response?.data || error.message);
    return [];
  }
};


export const likePost = (postId, token) => 
  axios.post(`${API_URL_POSTS}/like/${postId}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const commentOnPost = (postId, commentData, token) => 
  axios.post(`${API_URL_POSTS}/comment/${postId}`, commentData, {
    headers: { Authorization: `Bearer ${token}` },
  });

    export const loginUser = async (userData) => {
      try {
        const response = await axios.post(`${API_URL_AUTH}/login`, userData);
        return response.data;
      } catch (error) {
        console.error("❌ Login API Request Failed:", error.response?.data || error.message);
        throw error.response?.data || { error: "Server error" };
      }
    };
    
export const signupUser = async (userData) => {
      return await axios.post(`${API_URL_AUTH}/signup`, userData);
    };
   
    

    export const getUserProfile = async (username) => {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
    
      console.log("🔹 Token being sent:", token); // Debugging  
    
      try {
        const response = await axios.get(`http://localhost:5000/api/profile/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token in headers
          },
        });
    
        console.log("✅ Profile API Response:", response.data);
        return response.data;
      } catch (error) {
        console.error("❌ Error fetching user profile:", error.response ? error.response.data : error);
        return null;
      }
    };
    

    
    
    export const getUserPosts = async (username, token) => {
      console.log("🔹 Fetching user posts...");
      console.log("🔹 Token being sent:", token); // Debugging token
    
      if (!token) {
        console.error("❌ No token found for posts!");
        return { error: "No token provided" };
      }
    
      try {
        const response = await axios.get(`${API_URL}/posts/user/${username}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("✅ User Posts API Response:", response.data);
        return response.data;
      } catch (error) {
        console.error("❌ Error fetching user posts:", error.response?.data || error.message);
        throw error.response?.data || { error: "Server error" };
      }
    };
    


    