import React, { useState } from "react";

const Modal = ({ setshowModal }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  return (
    <div className="bg-white p-5 rounded-md w-96">
      <h1 className="text-greyy text-center text-3xl mb-3">New Complaint</h1>
      <div className="flex justify-between p-1">
        <p className="text-greyy text-sm">
          Register a new complain of your area
        </p>
        <p className="text-greyy text-sm">07-05-2022</p>
      </div>
      <div>
        <p className="p-1 pb-1">Title</p>
        <input
          className="p-3 box-border border-2 w-full border-greyy rounded-md mb-3"
          type="text"
          placeholder="Title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <p className="p-1 pb-1">Description</p>
        <textarea
          className="p-3 box-border border-2 w-full border-greyy rounded-md"
          rows="7"
          placeholder="Description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button
        className="bg-header box-border border-2 rounded-md p-2 text-white text-center mb-3 cursor-pointer w-full mt-3"
        //   onClick={() => setshowModal(true)}
      >
        Add Complaint
      </button>
      <button
        className="bg-red-600 box-border border-2 rounded-md p-2 text-white text-center cursor-pointer w-full"
        onClick={() => setshowModal(false)}
      >
        Close
      </button>
    </div>
  );
};

export default Modal;
