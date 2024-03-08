import { Routes, Route } from "react-router-dom";
import {Login, ProfileDetails, TeamPage, UpdateOkr} from "../pages";
import {ProtectedRoute} from "./ProtectedRoute";
export const AppRouters = () => {
    return (
        <Routes>
            <Route>
                <Route path="/" element={<Login />} />
                <Route path="/profile" element={<ProtectedRoute><ProfileDetails /></ProtectedRoute>} />
                <Route path="/team" element={<ProtectedRoute><TeamPage /></ProtectedRoute>} />
                <Route path="/update-okr" element={<ProtectedRoute><UpdateOkr/></ProtectedRoute>}/>
            </Route>
        </Routes>
    )
}
                                                                             