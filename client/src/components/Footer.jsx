import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="flex flex-col gap-4 p-2 items-center justify-between md:flex-row bg-black text-white">
            <div>
                <ul className="flex items-center justify-center gap-3 sm:gap-10">
                    <li className="hover:text-cyan-500 hover:scale-110 transition-all">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="hover:text-cyan-500 hover:scale-110 transition-all">
                        <Link to="/about">About</Link>
                    </li>
                    <li className="hover:text-cyan-500 hover:scale-110 transition-all">
                        <Link to="/projects">Projects</Link>
                    </li>
                    <li className="hover:text-cyan-500 hover:scale-110 transition-all">
                        <Link to="/articles">Articles</Link>
                    </li>
                    <li className="hover:text-cyan-500 hover:scale-110 transition-all">
                        <Link to="/contact">Contact</Link>
                    </li>
                </ul>
            </div>
            <div className="flex items-center justify-center text-center">
                <p>&copy; 2024 Niraj Kumar Jha. All Rights Reserved.</p>
            </div>
        </footer>
    )
}

export default Footer;