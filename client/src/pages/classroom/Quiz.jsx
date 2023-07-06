import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {useRecoilValue} from "recoil";
import {isLoggedInState} from "../../services/atoms";

export default function Quiz() {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState();
  const [answers, setAnswers] = useState([]);
  const [msg, setMsg] = useState("");

  if (!isLoggedIn) {
    window.location.href="/login"
  }
  const token = localStorage.getItem("token");
  useEffect(() => {
    const getQuiz = async () => {
      try {
        const response = await axios.get(
          `https://m-skripsi.my.id/api/quiz/${quizId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response && response.data) {
          setQuiz(response.data);
        }
      } catch (error) {
        console.log(error.response.data.msg);
      }
    };

    getQuiz();
  }, [setQuiz, quizId]);

  const handleOptionChange = (questionIndex, optionIndex) => {
    setAnswers((prevAnswers) => {
      const newAnswers = Array.from(
        { length: quiz.questions.length },
        (_, index) =>
          prevAnswers[index] !== undefined ? prevAnswers[index] : ""
      );
      newAnswers[questionIndex] = optionIndex;
      return newAnswers;
    });
  };

  const handleSubmit = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, submit it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const sendAnswers = async () => {
          try {
            const response = await axios.post(
              "https://m-skripsi.my.id/api/quiz/submission",
              {
                quizId: quizId,
                answers: answers,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if(response){
              Swal.fire("Success!", "Your answer has been submit.", "success");
              window.history.back();
            }
          } catch (error) {
            setMsg(error.response.data.msg);
            if(error){
              Swal.fire("Failed!", "Your answer failed to submit.", "error");
            }
          }
        };
        sendAnswers();
      }
    });
  };

  return (
    <form className="p-2">
      {quiz && quiz._id ? (
        <div className="p-6 m-5 mx-auto max-w-4xl shadow-md border">
          <h2 className="text-xl text-center capitalize p-2 mb-2">
            {quiz.title}
          </h2>
          {msg? msg : ""}
          <hr className="mt-6 mb-4" />
          {quiz.questions
            ? quiz.questions.map((question, index) => (
                <div className="m-2" key={index}>
                  <p>{index + 1 + ". " + question.text}</p>
                  {question.options
                    ? question.options.map((option, optionIndex) => (
                        <div key={optionIndex}>
                          <input
                            type="radio"
                            name={index}
                            value={option}
                            onChange={() => handleOptionChange(index, option)}
                          />{" "}
                          {option}
                        </div>
                      ))
                    : ""}
                </div>
              ))
            : ""}
          <div className="w-fit mx-auto">
            <button type="button" className="btn px-8 btn-accent" onClick={handleSubmit}>
              Submit
            </button>
          </div>
          <hr className="mt-4 mb-2" />
          <p className="text-center text-xs">Quiz generate by OpenAI</p>
        </div>
      ) : (
        ""
      )}
    </form>
  );
}
