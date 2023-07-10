import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { isLoggedInState } from "../services/atoms";
import { useRecoilState } from "recoil";
import Loading from "../components/Loading"
import config from "../config";

export default function Register() {
  const isLoggedIn = useRecoilState(isLoggedInState)[0]
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  if(isLoggedIn){
    return window.location.href="/"
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.disabled = true;
    setMsg("")
    setLoading(true);
    try {
      const response = await axios.post(
        `${config.API_BASE_URL}/api/user/register`,
        {
          fullName: fullName,
          email: email,
          password: password,
          phone: phone,
          role: role,
        }
      );
      setMsg(
        <p className="text-center text-green-500">
          {response.data.msg}. Redirect in 3s
        </p>
      );
      setLoading(false);
      setTimeout(() => {
        window.location.href = "/login";
        e.target.disabled = false;
      }, 3000);
    } catch (error) {
      setMsg(<p className="text-center text-red-500">{error.message}</p>);
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
          Sign up
        </h1>
        <form className="mt-6">
          {msg ? msg : ""}
          <div className="mb-2">
            <label
              htmlFor="fullName"
              className="block text-sm font-semibold text-gray-800"
            >
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              className="block w-full px-4 py-2 mt-2 text-primary bg-transparent border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
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
          <div className="mb-2">
            <label
              htmlFor="phone"
              className="block text-sm font-semibold text-gray-800"
            >
              Phone
            </label>
            <input
              id="phone"
              type="text"
              value={phone}
              className="block w-full px-4 py-2 mt-2 text-primary bg-transparent border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="role"
              className="block text-sm font-semibold text-gray-800"
            >
              Role
            </label>
            <select
              name="role"
              id="role"
              className="input input-bordered w-full mt-2"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option>Choose roles</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>
          <div className="mt-6">
            <button
              type="button"
              onClick={(e) => handleSubmit(e)}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-primary rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Register
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-purple-600 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
