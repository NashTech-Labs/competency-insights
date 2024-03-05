import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../auth/Login";
import Dashboard from "../auth/Dashboard";

export const AppRouters = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    )
}
