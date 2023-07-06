import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { isLoggedInState } from "../services/atoms";
import { useRecoilState } from "recoil";
import Loading from "../components/Loading"

export default function Login() {
  const isLoggedIn = useRecoilState(isLoggedInState)[0]
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  if(isLoggedIn){
    if (window.history){
      window.history.back();
    }
    window.location.href="/"
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.disabled = true;
    setMsg("")
    setLoading(true);
    try {
      const response = await axios.post(
        "https://m-skripsi.my.id/api/user/login",
        {
          email: email,
          password: password,
        }
      );
      setMsg(<p className="text-center text-green-500">{response.data.msg}. Redirect in 3s</p>);
      localStorage.setItem("token", response.data.token);
      setLoading(false);
      setTimeout(() => {
        window.location.href="/";
        e.target.disabled = false;
      },2000);
    } catch (error) {
      console.log(error)
      setMsg(<p className="text-center text-red-500">{error.response.data.msg}</p>);
      e.target.disabled = false;
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading/>;
  }
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-primary underline">
          Sign in
        </h1>
        <form className="mt-6">
          {msg ? msg : ""}
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              className="block w-full px-4 py-2 mt-2 text-primary bg-transparent border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              className="block w-full px-4 py-2 mt-2 text-primary bg-transparent border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Link to="#" className="text-xs text-purple-600 hover:underline">
            Forget Password?
          </Link>
          <div className="mt-6">
            <button
              type="button"
              onClick={(e) => handleSubmit(e)}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-primary rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Login
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Don't have an account?{" "}
          <Link to="/register" className="font-medium text-purple-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
