import React, { useState } from "react";
import { Link } from "react-router-dom";

function Modal() {
  return (
    <div className="right-[15vw] absolute z-50 bg-white shadow-lg rounded-md px-6 py-2 min-[650px]:right-[6vw]">
      <Link to={"/post/create"}>
        <p>Post</p>
      </Link>
      <hr />
      <Link to={"/reel/create"}>
        <p>Reel</p>
      </Link>
    </div>
  );
}

export default Modal;
