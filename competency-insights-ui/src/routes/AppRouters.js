import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Login, ProfilePage} from "../pages";
export const AppRouters = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </Router>
    )
}
