import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import {isLoggedInState, userState} from "../services/atoms";
import axios from "axios";
import { FaClipboard } from "react-icons/fa";
import { Link } from "react-router-dom";
import config from "../config";

export default function Classroom() {
  const user = useRecoilValue(userState);
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const [name, setName] = useState("");
  const [subjects, setSubjects] = useState("");
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");
  if (!isLoggedIn) {
    window.location.href="/login"
  }
  const token = localStorage.getItem("token");
  const handleSubmitClass = async () => {
    try {
      const response = await axios.post(
        `${config.API_BASE_URL}/api/class/register`,
        {
          name: name,
          subjects: subjects,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response) {
        window.location.reload();
      }
    } catch (error) {
      setMsg(
        <p className="text-red-500 text-center">{error.response.data.msg}</p>
      );
    }
  };

  const handleJoinClass = async () => {
    try {
      const response = await axios.post(
        `${config.API_BASE_URL}/api/user/join-class`,
        {
          code: code,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        window.location.reload();
      }
    } catch (error) {
      setMsg(
        <p className="text-red-500 text-center">{error.response.data.msg}</p>
      );
    }
  };

  const modalNewClass = (
    <>
      {/* Open the modal using ID.showModal() method */}
      <button className="btn btn-sm m-1" onClick={() => window.my_modal_5.showModal()}>
        Create Class
      </button>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg text-center mb-6">Create Class</h3>
          {msg ? msg : ""}
          <div className="mb-2">
            <input
              id="name"
              type="text"
              placeholder="Enter name of class"
              className="block w-full px-4 py-2 mt-2 text-primary bg-transparent border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <input
              id="subjects"
              type="text"
              placeholder="Enter subjects of class"
              className="block w-full px-4 py-2 mt-2 text-primary bg-transparent border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setSubjects(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSubmitClass}
          >
            Submit
          </button>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>
    </>
  );

  const modalJoinClass = (
    <>
      {/* Open the modal using ID.showModal() method */}
      <button className="btn btn-sm m-1" onClick={() => window.my_modal_6.showModal()}>
        Join Class
      </button>
      <dialog id="my_modal_6" className="modal modal-bottom sm:modal-middle">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg text-center mb-6">Join Class</h3>
          {msg ? msg : ""}
          <div className="mb-2">
            <input
              id="code"
              type="text"
              placeholder="Enter code of class"
              className="block w-full px-4 py-2 mt-2 text-primary bg-transparent border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleJoinClass}
          >
            Submit
          </button>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>
    </>
  );

  return (
    <div className="mx-auto px-4 py-2">
      <div className="flex justify-between border-b py-2">
        <h2 className="self-center text-xl font-semibold">Class List</h2>
        <div className="">
          {user && user.role === "teacher" ? modalNewClass : ""} {modalJoinClass}
        </div>
      </div>
      <div className="p-2 flex flex-wrap">
        {user && user.classes
          ? user.classes.map((Class) => (
              <div
                key={Class._id}
                className="card w-full max-w-sm m-1 bg-accent text-accent-content"
              >
                <div className="card-body">
                  <div className="block">
                    <div className="">
                      <h2 className="card-title">{Class.name}</h2>
                      <h3 className="text-sm">{Class.subjects}</h3>
                      <p className="text-sm">
                        {Class && Class.students ? Class.students.length : 0}{" "}
                        Member
                      </p>
                    </div>
                  </div>
                  <div className="card-actions flex justify-between flex-wrap">
                    <span
                      className="btn btn-xs self-end cursor-pointer w-fit flex justify-between border-0"
                      onClick={() =>
                        navigator.clipboard.writeText(
                          Class && Class.code ? Class.code : ""
                        )
                      }
                    >
                      <span>{Class && Class.code ? Class.code : ""}</span>
                      <FaClipboard className="cursor-copy" />
                    </span>
                    <Link to={`/classroom/${Class._id}`} type="button" className="btn w-full border-0">Visit</Link>
                  </div>
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}
