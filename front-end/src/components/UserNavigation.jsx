import { Link, useNavigate } from "react-router-dom";

import { useUser } from "../context/UserContext";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";

const UserNavigation = () => {
    const navigate = useNavigate();
    const { user, logout } = useUser();

    const handleLogout = async () => {
        try {
            await axios.post("https://book-haven-1-i6ra.onrender.com/api/v1/logout", {}, {
                withCredentials: true
            });
            logout();
        } catch(err) {
            console.log("Error: " + err);
            toast.error("Failed to LogOut!!!");
        }
    }

    return (
        <div className="bg-gray-700 rounded-lg absolute top-14 right-0 w-40 overflow-hidden duration-500 transition-all">
            <Toaster />
            <Link to={`/profile`} className="flex link gap-2 pl-2 py-4 hover:bg-black transition-all">Profile</Link>
            <Link to={`/dashboard`} className="flex gap-2 pl-2 py-4 hover:bg-black transition-all">Dashboard</Link>
            <Link to={`/settings`} className="flex gap-2 pl-2 py-4 hover:bg-black transition-all">Settings</Link>
            {
                user ? 
                        <button className="flex bg-black gap-2 h-10 items-center justify-center hover:bg-gray-100 hover:text-black transition-all w-full" onClick={handleLogout}>
                            <h1 className="text-lg font-small">Sign Out</h1>
                            <p className="text-sm font-small">@{user && user.fullname}</p>
                        </button>
                    :
                        <button className="flex bg-black gap-2 h-10 items-center justify-center hover:bg-gray-100 hover:text-black transition-all w-full" onClick={() => navigate("/signin")}>
                            <h1 className="text-lg text-center font-small">Sign In</h1>
                        </button>
            }
        </div>
    )
}

export default UserNavigation;