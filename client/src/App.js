import React, {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import {useRecoilState, useSetRecoilState} from "recoil";
import axios from "axios";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Loading from "./components/Loading";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Classroom from "./pages/Classroom";
import {isLoggedInState, userState} from "./services/atoms";
import MainClass from "./pages/classroom/index.jsx";
import Quiz from "./pages/classroom/Quiz";
import config from "./config";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
    const setUser = useSetRecoilState(userState);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const token = localStorage.getItem("token");

        const getUser = async () => {
            try {
                const response = await axios.get(`${config.API_BASE_URL}/api/user/get-user`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setUser(response.data);
                setIsLoggedIn(true);
                setLoading(false);
            } catch (error) {
                setIsLoggedIn(false);
                setLoading(false);
            }
        };

        if (token) {
            getUser();
            const interval = setInterval(getUser, 5000); // Mengirim permintaan setiap 5 detik
            return () => clearInterval(interval); // Membersihkan interval saat komponen unmount
        } else {
            setIsLoggedIn(false);
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <Loading/>;
    }

    return (
        <>
            <Header/>
            <main className="min-h-screen p-2 container mx-auto">
                <Routes>
                    <Route path="/" element={isLoggedIn ? <Classroom/> : <Login/>}/>
                    <Route path="/classroom" element={<Classroom/>}/>
                    <Route path="/classroom/:classId" element={<MainClass/>}/>
                    <Route path="/quiz/:quizId" element={<Quiz/>}/>
                    <Route path="/quiz" element={<p>ini quiz</p>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Routes>
            </main>
            <Footer/>
        </>
    );
}

export default App;
