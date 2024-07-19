import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageAnimation from "../pages/PageAnimation";
import getRecommendation from "../components/getAIRecomendation";

const EntryPage = () => {
    const navigate = useNavigate();
    const [recommendation, setRecommendation] = useState([]);
    console.log(recommendation);
    const [mood, setMood] = useState("");
    const [loading, setLoading] = useState(false);

    const navigateToAuthentication = () => {
        navigate("/signin");
    }

    const handleMoodSelection = async (selectedMood) => {
        setMood(selectedMood);
        // Here we would call the Gemini AI API to get book recommendations
        try {
            setLoading(true);
            const aiRecommendation = await getRecommendation(selectedMood);
            setRecommendation(aiRecommendation);
        } catch (err) {
            console.log("Error Occurred while fetching the data: " + err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageAnimation>
            <div className="min-h-screen bg-gray-100">
                <Navbar />
                <main className="pt-16">
                    <section id="home" className="relative h-screen flex items-center justify-center">
                        <div className="absolute inset-0 z-0">
                            <img
                                src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                                alt="Library background"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black opacity-50"></div>
                        </div>
                        <div className="relative z-10 text-center text-white">
                            <h2 className="text-5xl font-serif font-bold mb-4">Welcome to BookHaven</h2>
                            <p className="text-xl mb-8">Your gateway to a world of books and knowledge</p>
                            <div id="mood-based-recommendations" className="mb-8">
                                <h3 className="text-2xl mb-4">How are you feeling today?</h3>
                                <div className="flex justify-center space-x-4">
                                    <button onClick={() => handleMoodSelection('happy')} className="bg-yellow-400 text-black px-4 py-2 rounded">Happy</button>
                                    <button onClick={() => handleMoodSelection('sad')} className="bg-blue-400 text-black px-4 py-2 rounded">Sad</button>
                                    <button onClick={() => handleMoodSelection('excited')} className="bg-green-400 text-black px-4 py-2 rounded">Excited</button>
                                    <button onClick={() => handleMoodSelection('relaxed')} className="bg-purple-400 text-black px-4 py-2 rounded">Relaxed</button>
                                </div>
                                {
                                    !loading && recommendation.length > 0 ?
                                        <div className="mt-6 p-4 bg-white bg-opacity-20 rounded-lg">
                                            <p className="text-2xl font-bold mb-2">Based on your mood, we recommend:</p>
                                            {
                                                recommendation.map((book, index) => {
                                                    return (
                                                        <div key={index} className="flex items-start ml-4">
                                                            <h1 className="text-small font-medium">{book}</h1>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        :
                                            loading ? 
                                                <div className="mt-6 p-4 bg-white bg-opacity-20 rounded-lg">
                                                    <p>Hang tight, we are getting books for you...</p>
                                                </div> 
                                            : 
                                                ""
                                }
                            </div>
                            <button onClick={() => navigate("/dashboard")} className="bg-white text-black px-6 py-3 rounded-lg text-lg hover:bg-gray-200 transition duration-300">
                                Explore Our Collection
                            </button>
                        </div>
                    </section>
                    <section id="features" className="py-24 bg-white">
                        <div className="container mx-auto px-4">
                            <h3 className="text-3xl font-serif font-bold text-center mb-12 text-gray-800">Why Choose BookHaven?</h3>
                            <div className="grid md:grid-cols-3 gap-8">
                                <FeatureCard
                                    title="Vast Collection"
                                    description="Access thousands of books across all genres, from classics to the latest bestsellers."
                                    icon="📚"
                                />
                                <FeatureCard
                                    title="Personalized Recommendations"
                                    description="Our AI-powered system suggests books tailored to your reading preferences and history."
                                    icon="🎯"
                                />
                                <FeatureCard
                                    title="Community Reviews"
                                    description="Connect with fellow readers, share your thoughts, and discover new perspectives on your favorite books."
                                    icon="💬"
                                />
                            </div>
                        </div>
                    </section>
                    <section id="books" className="py-24 bg-gray-100">
                        <div className="container mx-auto px-4">
                            <h3 className="text-3xl font-serif font-bold text-center mb-12 text-gray-800">Featured Books</h3>
                            <div className="grid md:grid-cols-4 gap-8">
                                <BookCard
                                    title="The Great Gatsby"
                                    author="F. Scott Fitzgerald"
                                    imageUrl="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
                                />
                                <BookCard
                                    title="To Kill a Mockingbird"
                                    author="Harper Lee"
                                    imageUrl="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
                                />
                                <BookCard
                                    title="1984"
                                    author="George Orwell"
                                    imageUrl="https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
                                />
                                <BookCard
                                    title="Pride and Prejudice"
                                    author="Jane Austen"
                                    imageUrl="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
                                />
                            </div>
                        </div>
                    </section>
                    <section className="bg-stone-200 py-16">
                        <div className="container mx-auto px-4 text-center">
                            <h3 className="text-3xl font-serif font-bold mb-4 text-gray-800">Join Our Community</h3>
                            <p className="mb-8 text-xl text-gray-700">Sign up now and get 10% off your first purchase!</p>
                            <button onClick={navigateToAuthentication} className="bg-black text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-800 transition duration-300">
                                Sign Up Now
                            </button>
                        </div>
                    </section>
                    <section id="contact" className="py-5 bg-white">
                        <div className="container mx-auto px-4">
                            <h3 className="text-3xl font-serif font-bold text-center mb-12 text-gray-800">Contact Us</h3>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                                    <h4 className="text-xl font-serif font-semibold mb-4 text-gray-800">Get in Touch</h4>
                                    <form>
                                        <div className="mb-4">
                                            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                                            <input type="text" id="name" name="name" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400" required />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                                            <input type="email" id="email" name="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400" required />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                                            <textarea id="message" name="message" rows="4" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400" required></textarea>
                                        </div>
                                        <button type="submit" className="bg-black text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-800 transition duration-300 w-full">Send Message</button>
                                    </form>
                                </div>
                                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                                    <h4 className="text-xl font-semibold mb-4 text-gray-800">Contact Information</h4>
                                    <div className="space-y-4">
                                        <div className="flex items-start">
                                            <svg className="w-6 h-6 text-gray-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            </svg>
                                            <p className="text-gray-700">At your fingertip</p>
                                        </div>
                                        <div className="flex items-center">
                                            <svg className="w-6 h-6 text-gray-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                            </svg>
                                            <p className="text-gray-700">Please we prefer mail</p>
                                        </div>
                                        <div className="flex items-center">
                                            <svg className="w-6 h-6 text-gray-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                            </svg>
                                            <p className="text-gray-700">jhaniraj45@gmail.com</p>
                                        </div>
                                    </div>
                                    <div className="mt-8">
                                        <h5 className="text-lg font-semibold mb-4 text-gray-800">Operating Hours</h5>
                                        <ul className="space-y-2 text-gray-700">
                                            <div>
                                                <del>Monday - Friday: 9:00 AM - 8:00 PM</del><br />
                                                <del>Saturday: 10:00 AM - 6:00 PM</del><br />
                                                <del>Sunday: 12:00 PM - 5:00 PM</del>
                                            </div>
                                            <div>
                                                <h1 className="text-2xl font-s">Anytime you want ot read something :)</h1>
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
                <Footer />
            </div>
        </PageAnimation>
    );
}

const FeatureCard = ({ title, description, icon }) => {
    return (
        <div className="bg-gray-100 rounded-lg shadow-lg p-6 text-center">
            <div className="text-4xl mb-4">{icon}</div>
            <h3 className="text-xl font-serif font-bold mb-2 text-gray-800">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
}

const BookCard = ({ title, author, imageUrl }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h4 className="font-serif font-bold text-lg mb-2 text-gray-800">{title}</h4>
                <p className="text-sm text-gray-600">{author}</p>
            </div>
        </div>
    );
}

export default EntryPage;

// <section id="home" className="relative h-screen flex items-center justify-center">
//                     <div className="absolute inset-0 z-0">
//                         <img
//                             src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
//                             alt="Library background"
//                             className="w-full h-full object-cover"
//                         />
//                         <div className="absolute inset-0 bg-black opacity-50"></div>
//                     </div>
//                     <div className="relative z-10 text-center text-white">
//                         <h2 className="text-5xl font-serif font-bold mb-4">Welcome to BookHaven</h2>
//                         <p className="text-xl mb-8">Your gateway to a world of books and knowledge</p>
//                         <button onClick={() => navigate("/dashboard")} className="bg-white text-black px-6 py-3 rounded-lg text-lg hover:bg-gray-200 transition duration-300">
//                             Explore Our Collection
//                         </button>
//                     </div>
//                 </section>