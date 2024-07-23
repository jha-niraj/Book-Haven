import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";

import { useUser } from "../context/UserContext";
import UserNavigation from "./UserNavigation";
import profileImg from "../assets/dummyProfileImage.jpg"

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { user, login, logout } = useUser();
    console.log(user);
    const currentRoute = location.pathname.split('/').pop();
    const [userNavigationPannel, setUserNavigationPannel] = useState(false);

    const handleBlur = () => {
        setTimeout(() => {
            setUserNavigationPannel(false);
        }, 1000);
    }
    const handleProfileImg = () => {
        setUserNavigationPannel(current => !current);
    }

    return (
        <header className="bg-black text-white fixed w-full z-50">
            <Toaster />
            <div className="mx-auto w-full flex flex-wrap p-1 gap-3 justify-between items-center">
                <div className="flex justify-between items-center w-full">
                    <h1 className="text-2xl font-serif font-bold cursor-pointer" onClick={() => navigate("/")}>BookHaven</h1>
                    {
                        user ?
                            <div className="flex items-center justify-center gap-2">
                                <Link to="/dashboard/profile">
                                    <button className="w-10 h-10 flex items-center justify-center text-center relative bg-gray-200 rounded-full hover:bg-gray-300">
                                        <FaBell className="font-bold text-2xl" />
                                    </button>
                                </Link>
                                {/* Here I have initially used the div to store the profile Image and I am not getting the nBlur effect because it does not work on the div, it only works with the element like form, input and buttons */}
                                {/* Another issue is that when you are using the onBlur then it will hide the element as soon you click on it, so you wouldn't get the chance to direct to the profile or dashboard page. So to prevent that we are going to add a time delay. */}
                                <button className="w-10 h-10 relative flex items-center justify-center" onClick={handleProfileImg} onBlur={handleBlur}>
                                    <img src={profileImg} className="w-full h-full object-cover cursor-pointer rounded-full bg-gray-200" />
                                </button>
                                {
                                    userNavigationPannel ? <UserNavigation /> : ""
                                }
                            </div>
                            :
                            <div className="flex items-center justify-center gap-3">
                                {
                                    (currentRoute == "signin" || currentRoute == "signup") ? 
                                        <h1 className="text-xl font-medium">Welcome</h1>
                                    :
                                        <Link to="/signin" className="bg-gray-800 hover:bg-black flex items-center justify-center text-white py-2 px-4 rounded-full transition-all">
                                            Sign In
                                        </Link>
                                }
                            </div>
                    }
                </div>
                <nav className="w-full sm:relative sm:bottom-6">
                    <ul className="flex space-x-4 md:space-x-6 lg:space-x-8 justify-center">
                        <li><a href="#home" className="hover:text-gray-300">Home</a></li>
                        <li><a href="#features" className="hover:text-gray-300">Features</a></li>
                        <li><a href="#books" className="hover:text-gray-300">Books</a></li>
                        <li><a href="#contact" className="hover:text-gray-300">Contact</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}


export default Navbar;