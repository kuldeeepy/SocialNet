import Foot from "../components/Foot.jsx";
import { IoSearch } from "react-icons/io5";
import Spinner from "../components/Spinner.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { FaAngleLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { URL } from "../App.jsx";

function Search() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${URL}/feed`)
      .then((res) => {
        setLoading(false);
        setPosts(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message);
      });
  }, []);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      axios
        .get(`${URL}/search/${username}`)
        .then((res) => {
          setLoading(false);
          setResult(res.data);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err.response);
        });
    }
  };

  return (
    <>
      <div className="min-[650px]:ml-16">
        <div className="bg-[#efefef] mx-4 min-[650px]:mx-16 flex items-center gap-1 px-2 m-2 border border-black rounded-md">
          <IoSearch fill="gray" />
          <input
            onKeyDown={handleSearch}
            onChange={(e) => setUsername(e.target.value)}
            type="search"
            placeholder="Search"
            className="bg-inherit px-1 focus:outline-none w-full py-1 placeholder:font-light placeholder:text-black"
          />
        </div>
        <ToastContainer />
        {loading ? (
          <Spinner />
        ) : (
          <div className="top text-lg">
            {result?.length <= 0 ? (
              <div className="grid grid-cols-3 gap-[2px] w-full min-[650px]:flex min-[650px]:justify-center min-[650px]:gap-4">
                {posts?.map((post) => (
                  <img
                    src={post.image}
                    alt={post.caption}
                    key={post._id}
                    className="h-[150px] w-full object-cover min-[650px]:h-[250px] min-[650px]:max-w-[300px]"
                  />
                ))}
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between px-2 py-1 border-b-2 border-gray-200">
                  <Link to={"/"}>
                    <FaAngleLeft fontSize={23} className="self-start" />{" "}
                  </Link>
                </div>

                <div className="beneath flex-col mt-8 text-center">
                  <img
                    src={result.picture}
                    alt={result.uname}
                    className="mx-auto size-[100px] rounded-full object-top object-cover"
                  />
                  {/* max-w-[110px] max-h-[110px] */}
                  <h2>
                    <b>@{result.uname}</b>
                  </h2>
                  <div className="grid grid-cols-3 text-sm mt-3 text-center border-y-2 border-gray-200">
                    <div className="posts grid-col py-1">
                      <h2>
                        <b>{result?.posts?.length || 20}</b>{" "}
                      </h2>
                      <p>posts</p>
                    </div>
                    <div className="followi grid-col py-1">
                      <h2>
                        <b>160</b>
                      </h2>
                      <p>followers</p>
                    </div>
                    <div className="follows grid-col py-1">
                      <h2>
                        <b>30</b>
                      </h2>
                      <p>following</p>
                    </div>
                  </div>
                </div>
                <div className="bottom grid grid-cols-3 gap-1 mt-1">
                  {result.posts?.map((post) => (
                    <img
                      key={post._id}
                      src={post.image}
                      alt={result.uname}
                      className="grid-col-1 h-full object-cover w-full"
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
      <Foot />
    </>
  );
}
export default Search;
