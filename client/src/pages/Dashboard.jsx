// Inmporting the necessary dependecies:
import { useEffect, useState, CSSProperties } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast"
import ScaleLoader from "react-spinners/ScaleLoader";
import { searchBooks } from "../api/BookApi";

// Importing the files and module:
import InputBox from "../components/InputBox";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import PageAnimation from "../pages/PageAnimation";
import Footer from "../components/Footer";
import dummyBooks from "../assets/dummyBooks";

import "../index.css";
const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

const Dashboard = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [books, setBooks] = useState([]);

    // To get the current route to assign it to Button Component:
    const location = useLocation();
    const { pathname, search } = location;
    const currentRoute = (pathname + search).split("/")[1];

    // Debouncing the value from the Search Query:
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 500)
        return () => clearTimeout(timerId);
    }, [searchQuery])

    // Fetching the data from the API:
    useEffect(() => {
        const fetchBooks = async () => {
            if (debouncedQuery) {
                setIsLoading(true);
                try {
                    const results = await searchBooks(debouncedQuery);
                    setBooks(results);
                } catch (error) {
                    console.error('Error fetching books:', error);
                } finally {
                    setIsLoading(false);
                }
            }
        };
        fetchBooks();
    }, [debouncedQuery]);

    console.log(books);

    return (
        <div className="flex flex-col min-h-screen w-full">
            <Toaster />
            <Navbar className="sticky top-0 z-10" />
            <PageAnimation className="flex-grow flex flex-col overflow-hidden">
                <section className="flex-shrink-0 w-full p-4 mt-20 bg-gray-100">
                    <div className="max-w-4xl mx-auto">
                        <InputBox
                            label="Search by Book Name"
                            type="text"
                            id="searchBook"
                            placeholder="Type your favourite book name"
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </section>
                <main className="flex-grow overflow-y-auto p-4">
                    <div className="max-w-6xl mx-auto">
                        {isLoading ? (
                            <div className="h-96 flex items-center justify-center">
                                <ScaleLoader
                                    color="#0d1413"
                                    loading={isLoading}
                                    cssOverride={override}
                                    size={150}
                                    height={70}
                                    width={10}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                />
                            </div> 
                        ) : (
                            <div>
                                <h1 className="text-2xl font-bold mb-4">Books</h1>
                                {
                                    books.length > 0 ?
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                            {books &&
                                                books.map((book, index) => (
                                                    <Card key={index} title={book.title} edition={book.edition_count} publishYear={book.first_publish_year} />
                                                ))}
                                        </div>
                                        :
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                            {dummyBooks &&
                                                dummyBooks.map((book, index) => (
                                                    <Card key={index} title={book.title} edition={book.edition_count} publishYear={book.first_publish_year} />
                                                ))}
                                        </div>
                                }
                            </div>
                        )}
                    </div>
                </main>
            </PageAnimation>
            <Footer className="mt-auto" />
        </div>
    )
}

export default Dashboard;