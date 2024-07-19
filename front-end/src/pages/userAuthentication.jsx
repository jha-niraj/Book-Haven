import InputBox from "../components/InputBox";
import Button from "../components/Button";
import PageAnimation from "./PageAnimation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useUser } from "../context/UserContext";
import { base_url } from "../url";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UserAuthentication = ({ endpoint }) => {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const { login } = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(base_url + endpoint, {
                fullname,
                email,
                password
            }, {
                withCredentials: true
            })
            toast.success(response.data.msg);
            setTimeout(() => {
                if (endpoint == "signup") {
                    window.dispatchEvent(new Event('tokenChange'));
                    login(response.data);
                    navigate("/")
                } else {
                    window.dispatchEvent(new Event('tokenChange'));
                    login(response.data);
                    navigate("/");
                }
            }, 1000);
        } catch (err) {
            toast.error("Unbale to Signin, Please try again!!!");
        }
    }

    // Debounce Example:
    // const [ inputValue, setInputValue ] = useState("");
    // const [ debouncedValue, setDebouncedValue ] = useState("");

    // useEffect(() => {
    //     const timerId = setTimeout(() => {
    //         setDebouncedValue(inputValue)
    //     }, 500)
    //     return () => clearTimeout(timerId);
    // }, [inputValue])

    return (
        <PageAnimation keyValue={endpoint}>
            <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 to-gray-200">
                <Navbar />
                <Toaster />
                <main className="flex-grow flex items-center justify-center px-4 mt-8 pt-16">
                    <div className="w-full max-w-md">
                        <form
                            className="bg-white shadow-2xl rounded-lg p-8 space-y-6"
                            onSubmit={handleSubmit}
                        >
                            <h1 className="text-3xl font-bold text-center text-gray-800">
                                {endpoint === "signup" ? "Create an Account" : "Welcome Back"}
                            </h1>
                            {endpoint === "signup" && (
                                <InputBox
                                    label="Full Name"
                                    name="fullname"
                                    value={fullname}
                                    type="text"
                                    id="fullname"
                                    placeholder="John Doe"
                                    onChange={(e) => setFullname(e.target.value)}
                                />
                            )}
                            <InputBox
                                label="Email"
                                name="email"
                                value={email}
                                type="email"
                                id="email"
                                placeholder="you@example.com"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <InputBox
                                label="Password"
                                name="password"
                                value={password}
                                type="password"
                                id="password"
                                placeholder="••••••••"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button
                                type="submit"
                                label={endpoint === "signup" ? "Sign Up" : "Sign In"}
                                className="w-full"
                            />
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                </div>
                            </div>
                            <div className="mt-6 text-center">
                                {endpoint === "signup" ? (
                                    <p className="text-sm text-gray-600">
                                        Already have an account?{' '}
                                        <Link to="/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
                                            Sign in
                                        </Link>
                                    </p>
                                ) : (
                                    <p className="text-sm text-gray-600">
                                        Don't have an account?{' '}
                                        <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                                            Sign up
                                        </Link>
                                    </p>
                                )}
                            </div>
                        </form>
                    </div>
                </main>
                <Footer />
            </div>
        </PageAnimation>
    )
}

export default UserAuthentication;