import { useEffect, useState } from "react";
import Foot from "../components/Foot.jsx";
import Spinner from "../components/Spinner.jsx";
import { FaRegHeart } from "react-icons/fa6";
import { AiOutlineMessage } from "react-icons/ai";
import { FaRegBookmark } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FiSend } from "react-icons/fi";
import { URL } from "../App.jsx";
import axios from "axios";

function Reel() {
  const [loading, setLoading] = useState(false);
  const [shorts, setShorts] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${URL}/reels`, { withCredentials: true })
      .then((res) => {
        setLoading(false);
        setShorts(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  // Function to handle video play
  // const handleVideoPlay = (index) => {
  //   videoRefs.current.forEach((videoRef, i) => {
  //     if (i !== index && !videoRef.paused) {
  //       videoRef.pause();
  //     }
  //   });
  // };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="relative min-[650px]:mx-16 w-full h-[100vh] snap-y">
          {shorts.map((short) => (
            <div
              key={short._id}
              className="relative mx-auto sm:max-w-[450px] sm:my-8 sm:h-[92vh] "
            >
              <video
                autoPlay
                src={short.video}
                disablePictureInPicture
                className="w-full sm:h-full object-cover max-sm:h-[100vh] snap-center"
                controlsList="nodownload "
              ></video>
              <div className="absolute top-32 right-3 sm:right-[-55px] sm:top-40 h-full flex flex-col justify-center">
                <div className="flex flex-col items-end">
                  <Sticker />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Foot />
    </>
  );
}

const Sticker = () => {
  return (
    <div className="bg-white p-2 rounded-full shadow-md flex flex-col gap-6 text-2xl">
      <FaRegHeart />
      <AiOutlineMessage />
      <FiSend />
      <FaRegBookmark />
      <HiOutlineDotsHorizontal />
    </div>
  );
};

export default Reel;
