import Header from "./components/layouts/Header";
import {useState} from "react";

function App() {
    const [isLoad, setIsLoad] = useState(true);
    setTimeout(() => {
        setIsLoad(false)
    },4000)
    return (
        <div className="App">
            {isLoad ? <div className="fixed h-screen w-screen bg-base-300/50 backdrop-blur" style={{zIndex: 999999}}><div
                className="w-full h-2 bg-base-100"><div id="loader" className="bg-blue-600 h-full"></div></div></div> : ""}
            <Header/>
            <main>
                <div className="hero min-h-screen bg-base-200">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
                             className="max-w-sm rounded-lg shadow-2xl"/>
                        <div>
                            <h1 className="text-5xl font-bold">Box Office News!</h1>
                            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
                                excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                            <button className="btn btn-primary">Get Started</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
