import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import axios from "axios";
import Nav from "./components/Nav";
import PostForm from "./components/PostForm";

function App() {
  interface IPost {
    title: string;
    content: string;
    author: string;
    date: Date;
    published: boolean;
    imageUrl: string;
  }

  interface IUser {
    username: string;
    _id: string;
  }

  const [user, setUser] = useState<null | undefined | IUser>();
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    axios
      .get("/api/posts")
      .then((res) => {
        setPosts(res.data);
        console.log(posts);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <BrowserRouter>
        <Nav user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/create"
            element={<PostForm user={user} posts={posts} setPosts={setPosts} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
