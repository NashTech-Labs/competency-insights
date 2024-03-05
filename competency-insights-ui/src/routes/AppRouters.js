import { Routes, Route } from "react-router-dom";
import Login from "../auth/Login";
import Dashboard from "../auth/Dashboard";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Login, ProfilePage} from "../pages";
export const AppRouters = () => {
    return (
        <Routes>
            <Route>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Route>
        </Routes>
               
     
    )
}
