import axios from "axios";
import Spinner from "../components/Spinner";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../Context.jsx";
import { useContext } from "react";
import { URL } from "../App.jsx";

function Login() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ uanme: "", pwd: "" });
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    axios
      .post(`${URL}/login`, data, { withCredentials: true })
      .then((res) => {
        toast.success(`${res.data.message}`, {
          position: "top-center",
          autoClose: 1000,
          onClose: () => navigate("/"),
        });
        localStorage.setItem("token", res.data.token);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        setLoading(false);
        err.response.status === 401
          ? toast.error("User Not Found")
          : console.log(err);
      });
  };

  return (
    <>
      <ToastContainer />
      {loading ? <Spinner /> : ""}
      <div className="flex bg-black h-[100vh] text-white flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img className="mx-auto h-10 w-auto" src={logo} alt="Your Company" /> */}
          <h1 className="text-center font-bold">INSTAGRAM</h1>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <div className="mt-2">
                <input
                  id="uname"
                  name="uname"
                  type="text"
                  placeholder="Username"
                  required
                  value={data.email}
                  onChange={(e) => setData({ ...data, uname: e.target.value })}
                  className="block w-full text-gray-900 rounded-md border-0 py-1.5 px-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="mt-2">
                <input
                  id="pwd"
                  name="pwd"
                  type="password"
                  placeholder="Password"
                  required
                  value={data.pwd}
                  onChange={(e) => setData({ ...data, pwd: e.target.value })}
                  className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-md font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Don't have account?{" "}
            <Link
              to="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
