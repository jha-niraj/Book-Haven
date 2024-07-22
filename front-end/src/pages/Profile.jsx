import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import userAvatar from "../assets/dummyProfileImage.jpg";
import { useUser } from "../context/UserContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import toast, { Toaster } from "react-hot-toast";
import InputBox from "../components/InputBox";

const Profile = () => {
    const [userBooks, setUserBooks] = useState([]);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const user = useUser();
    const navigate = useNavigate();

    if (!user) {
        navigate("/signin");
    }

    useEffect(() => {
        const fetchUserBooks = async () => {
            const response = await axios.get("https://book-haven-1-i6ra.onrender.com/api/v1/getbooks", {
                withCredentials: true
            })
            setUserBooks(response.data.books)
        }
        fetchUserBooks();
    }, []);

    const handleDeleteBook = async (id) => {
        try {
            const response = await axios.post("https://book-haven-1-i6ra.onrender.com/api/v1/deleteuserbooks", {
                bookId: id
            }, {
                withCredentials: true
            })
            setUserBooks(userBooks.filter((book) => book !== id));
            toast.success(response.data.msg);
        } catch (err) {
            toast.error("Book deletion failed, try again!!!")
        }
    };

    const handlePasswordUpdate = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.put("https://book-haven-1-i6ra.onrender.com/api/v1/updatepassword", {
                newPassword,
                oldPassword
            }, {
                withCredentials: true
            })
            toast.success(response.data.msg);
            setOldPassword("");
            setNewPassword("");
        } catch(err) {
            console.log("Error on the Front-End: " + err);
            toast.error("Cannot update the Password")
        }
    };

    return (
        <div>
            <Navbar />
            <Toaster />
            <div className="h-[calc(100vh-80px)] overflow-y-auto">
                <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="mt-20 flex items-center gap-4 mb-8">
                        <div className="h-16 w-16 rounded-full overflow-hidden">
                            <img src={userAvatar} alt="User avatar" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">{user.user.fullname}</h1>
                            <p className="text-gray-600">{user.user.email}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <h1 className="text-2xl font-medium">Your Books</h1>
                        {userBooks && userBooks.map((book, index) => (
                            <UserBookCard key={index} id={book} onClick={() => handleDeleteBook(book)} />
                        ))}
                    </div>
                    <hr className="my-8 border-t border-gray-300" />
                    <div className="mt-6">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
                            <form onSubmit={handlePasswordUpdate} className="space-y-4">
                                <div>
                                    <InputBox label="Old Password" name="oldpassword" id="oldpassword" placeholder="Enter your Old Password" type="password" onChange={(e) => setOldPassword(e.target.value)} value={oldPassword} />
                                </div>
                                <div>
                                    <InputBox label="New Password" name="newpassword" id="newpassword" placeholder="Enter your New Password" type="password" onChange={(e) => setNewPassword(e.target.value)} value={newPassword} />
                                </div>
                                <button className="w-[100%] bg-gray-300 hover:bg-black hover:text-white rounded-lg h-10 text-xl font-small transition-all duration-500" type="submit">Update Password</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

const TrashIcon = (props) => {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
    );
}

const UserBookCard = ({ id, onClick }) => {
    const [bookData, setBookData] = useState([]);

    useEffect(() => {
        const fetchBookDetials = async () => {
            const response = await axios.post("https://book-haven-1-i6ra.onrender.com/api/v1/getbookdetails", {
                bookId: id
            }, {
                withCredentials: true
            })
            setBookData(response.data.book);
        }
        fetchBookDetials();
    }, [])

    return (
        <div key={bookData.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2 truncate">
                    {bookData.title}
                </h2>
                <div className="flex flex-col">
                    <p className="text-sm text-gray-600 mb-2">
                        Edition Count: <span className="font-medium">{bookData.edition}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                        Published Year: <span className="font-medium">{bookData.publish_year}</span>
                    </p>
                </div>
            </div>
            <div className="flex justify-end p-4">
                <button
                    onClick={() => onClick()}
                    className="text-red-500 hover:text-red-700"
                >
                    <TrashIcon className="h-5 w-5" />
                    <span className="sr-only">Delete book</span>
                </button>
            </div>
        </div>
    )
}

export default Profile;