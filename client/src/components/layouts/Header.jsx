import React from "react";
import { Link } from "react-router-dom";
import ColorModeSwitcher from "../ColorModeSwitcher";
import { isLoggedInState } from "../../services/atoms";
import { useRecoilState } from "recoil";
import Swal from "sweetalert2";

export default function Header() {
  const isLoggedIn = useRecoilState(isLoggedInState)[0];

  const handleLogout = async () => {
    if (isLoggedIn) {
      Swal.fire({
        title: "Logout",
        text: "Are you sure you want to exit?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, logout",
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem("token");
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Logged out successfully!',
            showConfirmButton: false,
            timer: 1500
          })
        }
        setTimeout(() => {
            window.location.href="/"
        }, 1500)
      });
    }
  };

  const menuBeforeLogin = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/contact">Contact</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </>
  );
  const menuAfterLogin = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/classroom">Classroom</Link>
      </li>
      <li>
        <Link to="/Quiz">Quiz</Link>
      </li>
      <li>
        <Link to="/contact">Contact</Link>
      </li>
    </>
  );
  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full navbar bg-base shadow-md flex justify-between">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="px-2 mx-2 flex-1 font-semibold lg:flex-none lg:text-2xl">
            EduSense
          </div>
          <div className="hidden lg:block">
            <ul className="menu menu-horizontal">
              {isLoggedIn ? menuAfterLogin : menuBeforeLogin}
            </ul>
          </div>
          {isLoggedIn ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn m-1 btn-ghost">
                <div className="avatar self-center">
                  <div className="w-8 rounded-full">
                    <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                  </div>
                </div>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-none w-52"
              >
                <li>
                  <ColorModeSwitcher />
                </li>
                <li>
                  <Link to="">Profile</Link>
                </li>
                <li>
                  <Link to="" onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <div className="">
              <ColorModeSwitcher />
            </div>
          )}
        </div>
      </div>
      <div className="drawer-side fixed" style={{ zIndex: 9999 }}>
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-base-200 leading-8">
          {/* Sidebar content here */}
          {isLoggedIn ? menuAfterLogin : menuBeforeLogin}
        </ul>
      </div>
    </div>
  );
}
