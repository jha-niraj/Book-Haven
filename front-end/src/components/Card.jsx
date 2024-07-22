import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "./Button";
import { useUser } from "../context/UserContext";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";


const Card = ({ title, edition, publishYear, onClick, route }) => {
    const [ isAdding, setIsAdding ] = useState(false);
    const { user } = useUser();
    const navigate = useNavigate();

    const handleAddToShelf = async() => {
        if(!user) {
            navigate("/signin");
        }
        setIsAdding(true);
        try {
            const response = await axios.post("/api/v1/addbook", {
                title,
                edition,
                publish_year: publishYear
            }, {
                withCredentials: true
            })

            if(response.data.success) {
                toast.success("Book added, Yay");
            }
        } catch(err) {
            console.log("Error" + err);
            toast.error("Failed to add Book, try agian!!!")
        } finally {
            setIsAdding(false);
        }
    }

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <Toaster />
            <div className="p-5">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2 truncate" title={title}>
                    {title}
                </h2>
                <div className="flex flex-col">
                    <p className="text-sm text-gray-600 mb-2">
                        Edition Count: <span className="font-medium">{edition}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                        Published Year: <span className="font-medium">{publishYear}</span>
                    </p>
                </div>
                <div className="mt-4">
                    <Button
                        onClick={handleAddToShelf}
                        label="Add to Book Shelf"
                    />
                </div>
            </div>
        </div>
    )
}

export default Card;