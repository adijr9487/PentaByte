import React, { useState } from "react";
import Modal from "./Modal";

const ComplaintBox = () => {
  const [showModal, setshowModal] = useState(false);
  return (
    <div className="container">
      <div className="box-border h-100 w-300 border-2 p-5 rounded-sm shadow-md shadow-gray-400 bg-gray-200 flex flex-col">
        <button
          className="bg-header box-border border-2 rounded-md p-2 text-white text-center mb-3 cursor-pointer w-full md:order-1 order-2"
          onClick={() => setshowModal(true)}
        >
          Register Complaint
        </button>
        <div className="bg-white p-3 md:order-2 order-1">
          <div className=" box-border border-2 rounded-md border-header pl-1 pr-1 mb-4 shadow-md shadow-gray-200 text-black">
            <div className="flex justify-between pt-2 flex-col md:flex-row">
              <p className="text-xs text-greyy pl-2 pr-2">ID:SFLK-12123</p>
              <p className="text-header text-xs pl-2 pr-2">07-05-2022</p>
            </div>
            <div className="pl-2 pr-2 text-header">Title</div>
            <div className="pl-2 pr-2 text-header">Description</div>
            <div className="pl-2 pr-2 text-pending text-right ">Pending</div>
          </div>
          <div className=" box-border border-2 rounded-md border-header p-1 mb-4 shadow-md shadow-gray-200 text-black">
            <div className="flex justify-between pt-2">
              <p className="text-xs text-greyy pl-2 pr-2">ID:SFLK-12123</p>
              <p className="text-header text-xs pl-2 pr-2">07-05-2022</p>
            </div>
            <div className="pl-2 pr-2 text-header">Title</div>
            <div className="pl-2 pr-2 text-header">Description</div>
            <div className="pl-2 pr-2 text-completed text-right ">
              Completed
            </div>
          </div>
          <div className=" box-border border-2 rounded-md border-header p-1 mb-4 shadow-md shadow-gray-200 text-black">
            <div className="flex justify-between pt-2">
              <p className="text-xs text-greyy pl-2 pr-2">ID:SFLK-12123</p>
              <p className="text-header text-xs pl-2 pr-2">07-05-2022</p>
            </div>
            <div className="pl-2 pr-2 text-header">Title</div>
            <div className="pl-2 pr-2 text-header">Description</div>
            <div className="pl-2 pr-2 text-pending text-right ">Pending</div>
          </div>
        </div>
      </div>
      {showModal ? (
        <div className="bg-greyy bg-opacity-50 absolute inset-0 flex justify-center items-center">
          <Modal setshowModal={setshowModal} />
        </div>
      ) : null}
    </div>
  );
};

export default ComplaintBox;
