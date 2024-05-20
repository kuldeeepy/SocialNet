import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useNavigate } from "react-router-dom";
import { IoIosSettings } from "react-icons/io";
import { FaAngleLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner.jsx";
import axios from "axios";
import { URL } from "../App.jsx";

function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${URL}/profile`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setLoading(false);
        setUser(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.response);
      });
  }, []);

  useEffect(() => {
    setLoading(true);

    let formData = new FormData();
    formData.append("image", image);
    axios
      .patch(`${URL}/${user._id}/edit`, formData, {
        withCredentials: true,
      })
      .then((res) => {
        setLoading(false);
        navigate("/profile");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.response);
      });
  }, [image]);

  return (
    <div className="text-lg">
      <ToastContainer />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="flex items-center justify-between px-2 py-1 border-y-2 border-gray-200">
            <Link to={"/"}>
              <FaAngleLeft fontSize={23} />
            </Link>
            <h2 className="font-medium">{user.uname}</h2>
            <IoIosSettings fontSize={25} />
          </div>
          <div className="beneath flex-col mt-8 text-center">
            <label htmlFor="file-fmt" className="hover:bg-none">
              <img
                src={user.picture}
                alt={user.uname}
                className=" mx-auto size-[110px] rounded-full object-cover"
              />
            </label>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="file-fmt"
              className="invisible"
            />
            <h2>
              <b>@{user.uname}</b>
              {user.bio}
            </h2>
            <div className="grid grid-cols-3 text-sm mt-3 text-center border-y-2 border-gray-200">
              <div className="posts grid-col py-1">
                <h2>
                  <b>{user?.posts?.length || 20}</b>
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
            {user.posts?.map((post) => (
              <img
                key={post._id}
                src={post.image}
                alt={user.uname}
                className="grid-col-1 h-full object-cover w-full"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
