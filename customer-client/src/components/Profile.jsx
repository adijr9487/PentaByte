import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { BsFillTelephoneFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";

const Profile = ({ open }) => {
  const [email, setEmail] = useState("nojifo6887@abincol.com");
  const [location, setLocation] = useState(
    "9 Dropping Juniper Drive, Rudiosnm 88345 United Stated"
  );
  const [phone, setPhone] = useState("7896541230");
  const [error, setError] = useState("");
  const [editProfile, seteditProfile] = useState(false);
  const handleSave = async (e) => {
    e.preventDefault();
    seteditProfile(false);
    try {
      // do something
      let res = await axios.post("");
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };
  return (
    <div
      className={`fixed h-screen box-border border-2 bg-white text-center flex flex-col p-10 items-center transition-all duration-500 `}
      style={{
        right: open ? "0" : "-200%",
      }}
    >
      <img
        src=""
        alt="image"
        className="w-36 h-36 border-2 rounded-full mb-3"
      />
      {/* <div className="absolute right-5 top-5 hover:cursor-pointer">
        <AiOutlineClose onClick={handleOpen} />
      </div> */}
      <div className="flex justify-center items-center border-2 p-2 mb-3">
        <div className="mr-6">
          <FaUserAlt />
        </div>
        <input
          className="outline-none"
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={editProfile ? false : true}
        />
      </div>
      <div className="flex justify-center items-center border-2 p-2 mb-3 break-normal">
        <div className="mr-6">
          <IoLocationSharp />
        </div>
        <input
          className="outline-none"
          type="text"
          name="location"
          onChange={(e) => setLocation(e.target.value)}
          disabled={editProfile ? false : true}
          value={location}
        />
      </div>
      <div className="flex justify-center items-center border-2 p-2 mb-3">
        <div className="mr-6">
          <BsFillTelephoneFill />
        </div>
        <input
          className="outline-none"
          type="number"
          name="phone"
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
          disabled={editProfile ? false : true}
        />
      </div>
      {editProfile ? (
        <button
          onClick={handleSave}
          className="max-w-xs bg-green-600 box-border border-2 rounded-md p-2 text-white text-center mb-3 cursor-pointer w-full mt-3"
        >
          Save Profile
        </button>
      ) : (
        <button
          onClick={() => seteditProfile(true)}
          className="max-w-xs bg-header box-border border-2 rounded-md p-2 text-white text-center mb-3 cursor-pointer w-full mt-3"
        >
          Edit Profile
        </button>
      )}
    </div>
  );
};

export default Profile;
