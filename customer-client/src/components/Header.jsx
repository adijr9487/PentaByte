import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";

const Header = ({ handleOpen }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="shadow-md w-full fixed top-0 left-0 bg-header z-50"
      style={{ height: "10vh" }}
    >
      <div className="h-full md:flex items-center justify-between py-4 md:px-10 px-7">
        <div className="font-bold text-2xl cursor-pointer flex items-center text-white">
          Pentabyte
        </div>
        <div
          onClick={() => setOpen(!open)}
          className="text-2xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          {open ? (
            <AiOutlineClose style={{ color: "white" }} />
          ) : (
            <IoMenu style={{ color: "white" }} />
          )}
        </div>
        <ul
          className={`md:flex md:items-center text-white absolute md:static bg-header md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-300 ease-in ${
            open ? "top-10 opacity-100" : "top-[-490px]"
          } md:opacity-100`}
        >
          <li className="md:ml-8 text-md md:my-0 my-7">
            <a className="cursor-pointer md:ml-5 text-md hover:text-gray-400 duration-100">
              Home
            </a>
          </li>
          <li className="md:ml-8 text-md md:my-0 my-7">
            <a className="cursor-pointer md:ml-5 text-md hover:text-gray-400 duration-100">
              How to use?
            </a>
          </li>
          <li className="md:ml-8 text-md md:my-0 my-7">
            <button
              onClick={handleOpen}
              className="cursor-pointer md:ml-5 text-md hover:text-gray-400 duration-100"
            >
              Profile
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
