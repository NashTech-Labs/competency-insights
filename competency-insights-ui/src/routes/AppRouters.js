import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from '../components/Layout/NavBar';
import {Login, ProfilePage} from "../pages";
export const AppRouters = () => {
    return (
        <Router>
              <Navbar/>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </Router>
    )
}
