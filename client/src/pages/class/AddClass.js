import {useRecoilState} from "recoil";
import {User} from "../../services/authAtoms";
import {useEffect} from "react";

export default function AddClass(){
    const [user, setUser] = useRecoilState(User);

    useEffect(() => {
        if (user){
            if (user.role !== "teacher"){
                window.location.href = "/class"
            }
        }
    })
    return(
        <>
            <form
                className="bg-base-300 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {/*{status}*/}
                <div className="mb-4">
                    <label className="block text-base font-bold mb-2" htmlFor="email">
                        Name
                    </label>
                    <input
                        className="shadow appearance-none border border-primary bg-base-300 rounded w-full py-2 px-3 text-base leading-tight focus:outline-none focus:shadow-outline placeholder:text-sm placeholder:italic"
                        id="name" type="text" placeholder="XII MIPA 7"
                        />
                </div>
                <div className="mb-4">
                    <label className="block text-base font-bold mb-2" htmlFor="email">
                        Subject
                    </label>
                    <input
                        className="shadow appearance-none border border-primary bg-base-300 rounded w-full py-2 px-3 text-base leading-tight focus:outline-none focus:shadow-outline placeholder:text-sm placeholder:italic"
                        id="name" type="text" placeholder="IPA"
                        />
                </div>
                <div className="mb-4">
                    <label className="block text-base font-bold mb-2" htmlFor="email">
                        Teacher
                    </label>
                    <input
                        className="shadow appearance-none border border-primary bg-base-300 rounded w-full py-2 px-3 text-base leading-tight focus:outline-none focus:shadow-outline placeholder:text-sm placeholder:italic"
                        id="name" type="text" value={user && user._id ? user._id : ""} disabled={true}
                        />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="btn btn-primary"
                        type="button" >
                        Add
                    </button>
                    <a className="inline-block align-baseline font-bold text-base hover:text-blue-600"
                       href="#">
                        Forgot Password?
                    </a>
                </div>
            </form>
        </>
    );
}