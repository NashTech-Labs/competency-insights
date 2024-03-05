import { Routes, Route } from "react-router-dom";
import Login from "../auth/Login";
import Dashboard from "../auth/Dashboard";

export const AppRouters = () => {
    return (
        <Routes>
            <Route>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Route>
        </Routes>
    )
}
