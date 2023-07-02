import Header from "./components/layouts/Header";
import {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import Login from "./pages/Login";
import {useRecoilState} from "recoil";
import {isLoggedInState, User} from "./services/authAtoms";
import axios from "axios";
import Class from "./pages/Class";
import Loading from "./components/Loading";
import AddClass from "./pages/class/AddClass";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
    const [user, setUser] = useRecoilState(User);
    const [isLoad, setIsLoad] = useState(true);

    const token = localStorage.getItem("token");

    useEffect(() => {
        const getUser = async () => {
            try {

                const response = await axios.get("http://localhost:9000/api/user/get-user", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = response.data;
                if (response) {
                    setUser(data);
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
                setIsLoad(false);
            } catch (error) {
                localStorage.removeItem("token");
                setIsLoggedIn(false);
                setIsLoad(false);
            }
        }
        getUser();
    }, []);

    return (
        <div className="App">
            {isLoad? <Loading/> : ""}
            <Header/>
            <main>
                <Routes>
                    <Route path="/" element={isLoggedIn ? "" : <Welcome/>}/>
                    <Route path="/Class" element={<Class />}/>
                    <Route path="/add-class" element={<AddClass />}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </main>
        </div>
    );
}

export default App;
