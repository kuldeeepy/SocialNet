import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Search from "./pages/Search.jsx";
import Chat from "./pages/Chat.jsx";
import Reel from "./pages/Reel.jsx";
import Profile from "./pages/Profile.jsx";
import Nav from "./components/Nav.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import CreateReel from "./pages/CreateReel.jsx";
const URL = "https://socialnet-dblr.onrender.com";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Nav />}>
        <Route exact path="/" element={<Home />} />
      </Route>
      <Route path="/profile/:username" element={<Profile />} />
      <Route path="/search" element={<Search />} />
      <Route path="/reels" element={<Reel />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/inbox" element={<Chat />} />
      <Route path="/post/create" element={<CreatePost />} />
      <Route path="/reel/create" element={<CreateReel />} />
    </Routes>
  );
}

export { App, URL };
