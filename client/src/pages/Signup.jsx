import axios from "axios";
import { URL } from "../App.jsx";
import Spinner from "../components/Spinner";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function Signup() {
  const [loading, setLoading] = useState(false);
  const [uname, setUname] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate();
  const handleSubmit = () => {
    setLoading(true);
    axios
      .post(`${URL}/signup`, { uname, email, pwd }, { withCredentials: true })
      .then((res) => {
        setLoading(false);
        navigate(`/profile/${res.data.user}`);
        toast.success("Signed-Up Successfully");
      })
      .catch((res) => {
        setLoading(false);
        console.log(res.response.data);
      });
  };
  return (
    <div>
      <Toaster />
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col p-8 bg-gray-200 max-w-[85%] sm:max-w-[30%] sm:mt-[10%] mx-auto my-auto mt-[15%] rounded-md">
        <h2 className="text-center font-semibold">SIGNUP</h2>
        <input
          type="text"
          value={uname}
          onChange={(e) => setUname(e.target.value)}
          placeholder="Username"
          className="border border-black my-1 py-1 px-2 rounded-md"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
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

export default Signup;
