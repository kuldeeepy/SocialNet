import axios from "axios";
import { URL } from "../App.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner.jsx";

const CreateReel = () => {
  const [loading, setLoading] = useState(false);
  const [clip, setClip] = useState(null);
  const [caption, setCaption] = useState("");
  let navigate = useNavigate();

  let handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    let formData = new FormData();
    formData.set("clip", clip);
    formData.append("caption", caption);

    axios
      .post(`${URL}/reel/create`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  return (
    <div className="p-4">
      <h1 className="text-3xl my-4">Create Reel</h1>
      {loading ? (
        <Spinner />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col border-2 bg-gray-50 border-sky-400 rounded-lg max-w-[450px] p-8 mx-auto"
        >
          <div className="my-4 text-start">
            <label htmlFor="image" className="text-xl ml-1 text-gray-500">
              Video
            </label>
            <input
              type="file"
              onChange={(e) => setClip(e.target.files[0])}
              className="border-2 border-gray-500 px-4 py-2 my-2 w-full"
            />
          </div>
          <div className="my-4 text-start">
            <label htmlFor="title" className="text-xl ml-1 text-gray-500">
              Caption
            </label>
            <textarea
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 my-2 w-full"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-sky-300 p-3 font-medium hover:bg-sky-500 w-full"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateReel;
