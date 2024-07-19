import { Routes, Route } from "react-router-dom";

// Importing necessary components to render:
import EntryPage from './pages/EntryPage';
import Dashboard from "./pages/Dashboard";
import UserAuthentication from "./pages/userAuthentication";
import Profile from './pages/Profile';
import PersonalShelf from "./pages/PersonalShelf";
import PageNotFound from './pages/PageNotFound';
import { UserProvider } from "./context/UserContext";

const App = () => {

	return (
		<UserProvider>
			<Routes>
				<Route path="/" element={<EntryPage />} />
				<Route path="/signup" element={<UserAuthentication endpoint="signup" />} />
				<Route path="/signin" element={<UserAuthentication endpoint="signin" />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/profile/personalshelf" element={<PersonalShelf />} />
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</UserProvider>
	)
}

export default App;
