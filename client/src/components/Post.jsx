import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import { FaRegBookmark } from "react-icons/fa";
import { useEffect, useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Spinner from "./Spinner.jsx";
import useAuth from "../hooks/useAuth.jsx";
import { URL } from "../App.jsx";
import axios from "axios";

function Post() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [like, setLike] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLike = (postId) => {
    axios
      .patch(`${URL}/${postId}/like`, { username: user.uname })
      .then((res) => {
        setLike(res.data.like);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${URL}/feed`)
      .then((res) => {
        setLoading(false);
        setLike(like);
        setPosts(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        posts?.map((post) => (
          <div
            key={post._id}
            className="mx-auto max-w-[450px] shadow-md rounded-md pb-2 relative"
          >
            <div className="head flex items-center justify-between py-2 px-2">
              <div className="flex gap-3 items-center">
                <img
                  src={post.author?.picture || post.image}
                  className="rounded-full object-top  object-cover w-[40px] h-[40px]"
                  alt={post.author?.uname}
                />
                <h3>{post.author?.uname || post.username}</h3>
              </div>
              <HiOutlineDotsHorizontal fontSize={20} />
            </div>
            <div className="img h-full w-full">
              <img
                onDoubleClick={() => handleLike(post._id)}
                src={post.image}
                alt={post.author?.uname || post.username}
                className="object-cover min-w-[100%] max-h-[525px]"
              />
            </div>
            <div className="opts flex justify-between pt-3 pb-1 px-3 text-[22px]">
              <div className="flex gap-3">
                {like ? (
                  <FaHeart fill="red" onClick={() => handleLike(post._id)} />
                ) : (
                  <FaRegHeart onClick={() => handleLike(post._id)} />
                )}
                <AiOutlineMessage />
                <FiSend />
              </div>
              <FaRegBookmark />
            </div>
            <div className="py-1 px-3">
              <h3>
                Liked by <b>{post.likedBy[1]?.uname || post.author.uname}</b>{" "}
                and <b>others</b>
              </h3>
              <p className="text-[15px]">
                <b>{post.author?.uname || post.username}</b> {post.caption}
              </p>
            </div>
            <div className="w-full py-1">
              <input
                type="text"
                placeholder="Comment"
                className="bg-gray-400 block opacity-35 rounded-xl placeholder:text-slate-800 placeholder:font-medium px-3 py-1 w-[97%] mx-auto"
              />
            </div>
          </div>
        ))
      )}
    </>
  );
}

export default Post;
