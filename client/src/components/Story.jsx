import axios from "axios";
import { URL } from "../App.jsx";
import { useEffect, useState } from "react";

const Story = () => {
  const [story, setStory] = useState([]);

  useEffect(() => {
    axios
      .get(`${URL}/feed`, { withCredentials: true })
      .then((res) => {
        setStory(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="flex overflow-x-auto mx-auto items-center gap-5 px-4 py-3 max-w-[450px] border border-b">
      {story.map((str) => (
        <div key={str._id} className="flex flex-col items-center my-1">
          <img
            src={str.image}
            alt={str.caption}
            className="size-14 min-w-[56px] rounded-[50%] object-cover shadow-lg border-[3px]  border-slate-500"
          />
          <p className="text-sm">{str.author.uname}</p>
        </div>
      ))}
    </div>
  );
};

export default Story;
