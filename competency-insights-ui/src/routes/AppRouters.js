import { Routes, Route } from "react-router-dom";
import {Login, ProfileDetails} from "../pages";
import {ProtectedRoute} from "./ProtectedRoute";
export const AppRouters = () => {
    return (
        <Routes>
            <Route>
                <Route path="/" element={<Login />} />
                <Route path="/profile" element={<ProtectedRoute><ProfileDetails /></ProtectedRoute>} />
            </Route>
        </Routes>
    )
}
                                                                             