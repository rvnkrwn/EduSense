import {useEffect, useState} from "react";
import {useRecoilState} from "recoil";
import {isLoggedInState} from "../services/authAtoms";
import axios from "axios";
import Loading from "../components/Loading";

export default function Login() {
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        if (isLoggedIn) {
            window.location.href = "/";
        }
    }, [isLoggedIn]);

    const handleLogin = async () => {
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:9000/api/user/login", {
                email: email, password: password
            });
            setLoading(false);
            localStorage.setItem("token", response.data.token);
            setIsLoggedIn(true)
        } catch (error) {
            setStatus(<p className="text-red-600 text-center my-2">{error.response.data.msg}</p>);
            setLoading(false);
            setIsLoggedIn(false);
        }
    };

    return (
        <>
            {loading ? <Loading/> : ""}
            <form
                className="bg-base-300 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {status}
                <div className="mb-4">
                    <label className="block text-base font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border border-primary bg-base-300 rounded w-full py-2 px-3 text-base leading-tight focus:outline-none focus:shadow-outline placeholder:text-sm placeholder:italic"
                        id="email" type="email" placeholder="example@email.com"
                        onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="mb-6">
                    <label className="block text-base font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border border-primary bg-base-300 rounded w-full py-2 px-3 text-base leading-tight focus:outline-none focus:shadow-outline placeholder:text-sm placeholder:italic"
                        id="password" type="password" placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="btn btn-primary"
                        type="button" onClick={handleLogin}>
                        Sign In
                    </button>
                    <a className="inline-block align-baseline font-bold text-base hover:text-blue-600"
                       href="#">
                        Forgot Password?
                    </a>
                </div>
            </form>
        </>
    )
}