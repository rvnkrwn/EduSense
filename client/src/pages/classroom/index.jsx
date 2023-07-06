import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../services/atoms";
import Loading from "../../components/Loading";

export default function MainClass() {
  const { classId } = useParams();
  const user = useRecoilValue(userState);
  const [Class, setClass] = useState(null);
  const [title, setTitle] = useState(null);
  const [prompt, setPrompt] = useState(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  console.log(user);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const getDetailClass = async () => {
      try {
        const response = await axios.get(
          `https://m-skripsi.my.id/api/class/detail/${classId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setClass(response.data);
      } catch (error) {
        window.location.href = "/classroom";
      }
    };
    getDetailClass();
  }, [classId, setClass]);

  const handleNewQuiz = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://m-skripsi.my.id/api/quiz/register",
        {
          classId: classId,
          title: title,
          prompt: prompt,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        setMsg(
          <p className="text-green-500 text-center">{response.data.msg}</p>
        );
        setLoading(false);
      }
    } catch (error) {
      setMsg(<p className="text-red-500 text-center">{error.message}</p>);
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  const modalNewQuiz = (
    <>
      {/* Open the modal using ID.showModal() method */}
      <button className="btn" onClick={() => window.my_modal_6.showModal()}>
        New Quiz
      </button>
      <dialog id="my_modal_6" className="modal modal-bottom sm:modal-middle">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg text-center mb-6">New Quiz</h3>
          {msg ? msg : ""}
          <div className="mb-2">
            <input
              id="title"
              type="text"
              placeholder="Kuis 2 Kalkulus II"
              className="block w-full px-4 py-2 mt-2 text-primary bg-transparent border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <input
              id="prompt"
              type="text"
              placeholder="20 soal kalkulus materi trigonometri"
              className="block w-full px-4 py-2 mt-2 text-primary bg-transparent border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleNewQuiz}
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
    <div className="px-4">
      {Class && Class._id ? (
        <div key={Class._id} className="container p-2 mx-auto">
          <div className="title border-b flex justify-between py-2">
            <div className="self-center">
              <h2 className="md:text-xl font-bold text-secondary">
                {Class.name}
              </h2>
              <small className="font-normal">{Class.subjects}</small>
            </div>
            {user && user.role === "teacher" ? modalNewQuiz : ""}
          </div>
          <div className="mt-4">
            <div className="quiz shadow-lg rounded p-4">
              <h3 className="font-bold md:text-xl">List Quiz</h3>
              <div className="overflow-y-scroll max-h-72 h-72">
                {Class && Class.quizzes.length > 0 ? (
                  Class.quizzes.map((quiz, index) => (
                    <div
                      key={quiz._id}
                      className="flex justify-between border-b mt-2 py-2"
                    >
                      <h4 className="self-end capitalize lg:text-lg">
                        {quiz.title}
                      </h4>
                      {user && user.quizHistories.length > 0 ? (
                        user.quizHistories.find((q) => q.quiz === quiz._id) ? (
                          <div className="">
                            <div className="btn btn-xs btn-accent text-white">
                              {
                                user.quizHistories.find(
                                  (q) => q.quiz === quiz._id
                                ).score
                              }
                              /100
                            </div>{" "}
                            <div className="btn btn-xs btn-accent text-white">
                              Completed
                            </div>
                          </div>
                        ) : (
                          <Link
                            to={`/quiz/${quiz._id}`}
                            className="btn btn-sm btn-secondary text-white"
                          >
                            Take Quiz
                          </Link>
                        )
                      ) : (
                        <Link
                          to={`/quiz/${quiz._id}`}
                          className="btn btn-sm btn-secondary text-white"
                        >
                          Take Quiz
                        </Link>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="grid grid-cols-3 opacity-50">
                    <hr className="self-center" />
                    <small className="text-center">
                      no quiz list for you here
                    </small>
                    <hr className="self-center" />
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4 p-4 bg-base shadow-lg">
              <h2 className="mb-3 p-1 font-bold md:text-xl">List Student</h2>
              <div className="overflow-y-scroll max-h-72 p-1">
                <table className="w-full border">
                  <thead>
                    <tr>
                      <th className="border p-2">Name</th>
                      <th className="border p-2">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr key={Class.teacher._id}>
                      <td className="border p-2 capitalize">{Class.teacher.fullName}</td>
                      <td className="border p-2 capitalize">{Class.teacher.role}</td>
                    </tr>
                    {Class && Class.students
                      ? Class.students.map((student) => (
                          <tr key={student._id}>
                            <td className="border p-2 capitalize">{student.fullName}</td>
                            <td className="border p-2 capitalize">{student.role}</td>
                          </tr>
                        ))
                      : ""}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
