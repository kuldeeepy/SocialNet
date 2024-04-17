import axios from "axios";
import Spinner from "../components/Spinner";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { URL } from "../App.jsx";

function Login() {
  const [loading, setLoading] = useState(false);
  const [uname, setUname] = useState("");
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate();
  const handleSubmit = () => {
    setLoading(true);
    axios
      .post(`${URL}/login`, { uname, pwd }, { withCredentials: true })
      .then((res) => {
        setLoading(false);
        navigate(`/profile/${res.data.user}`);
        toast.success("Logged In Successfully");
      })
      .catch((err) => {
        setLoading(false);
        err.response.status === 401
          ? toast.error("User Not Found")
          : console.log(err);
      });
  };
  return (
    <div>
      <Toaster />
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col p-8 bg-gray-200 max-w-[85%] sm:max-w-[30%] sm:mt-[10%] mx-auto my-auto mt-[15%] rounded-md">
        <h2 className="text-center font-semibold">LOGIN</h2>
        <input
          type="text"
          value={uname}
          onChange={(e) => setUname(e.target.value)}
          placeholder="Username"
          className="border border-black my-1 py-1 px-2 rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          className="border border-black my-1 py-1 px-2 rounded-md"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-black hover:opacity-50 text-white py-1 mt-2 rounded-md"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Login;
