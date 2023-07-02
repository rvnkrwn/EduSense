import {useRecoilState} from "recoil";
import {User} from "../services/authAtoms";
import {Link} from "react-router-dom";

export default function Class() {
    const [user, setUser] = useRecoilState(User);

    return (
        <>
            <div className="container mx-auto p-4">
                <div className="flex justify-between">
                    <h2 className="text-xl self-center">Daftar Kelas</h2>
                    {user && user.role === "teacher" ?
                        <Link to="/add-class" className="self-center">New Class</Link>
                        : ""}
                </div>
                <hr className="my-4"/>
                <div className="flex flex-wrap">
                    {user && user.classes ? (
                        user.classes.map((Class) => (
                            <div key={Class._id} className="card w-96 bg-primary text-primary-content">
                                <div className="card-body">
                                    <h2 className="card-title">{Class.name}</h2>
                                    <p>{Class.subjects}</p>
                                    <div className="card-actions justify-end">
                                        <p className="btn">{Class.code}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (<div><p>Tidak ada data kelas</p></div>)}

                </div>
            </div>
        </>
    );
}
