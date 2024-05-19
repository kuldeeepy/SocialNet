import { LiaHomeSolid } from "react-icons/lia";
import { GrSearch } from "react-icons/gr";
import { BiMoviePlay } from "react-icons/bi";
import { TbMessageCircleBolt } from "react-icons/tb";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context.jsx";

function Foot() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <>
      {/* <div className="h-[42px] bg-transparent"></div> */}
      <div className="flex fixed bottom-0 gap-4 items-center justify-evenly text-[27px] w-full bg-white shadow-md py-2 min-[650px]:top-[55px] min-[650px]:flex-col min-[650px]:fixed min-[650px]:w-[60px]">
        <Link to={"/"}>
          <LiaHomeSolid />
        </Link>
        <Link to={"/search"}>
          <GrSearch />
        </Link>
        <Link to={"/reels"}>
          <BiMoviePlay />
        </Link>
        <Link to={"/inbox"}>
          <TbMessageCircleBolt />
        </Link>
        {isLoggedIn ? (
          <Link to={`/profile/`}>
            <FaRegUserCircle />
          </Link>
        ) : (
          <Link to={"/login"}>
            <FaRegUserCircle />
          </Link>
        )}
      </div>
      <Outlet />
    </>
  );
}

export default Foot;
