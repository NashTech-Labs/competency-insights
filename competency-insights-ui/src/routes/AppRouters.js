import { Routes, Route } from "react-router-dom";
import {Login} from "../pages";
import ProfileDetails from "../pages/Profile/ProfileDetails";
export const AppRouters = () => {
    return (
        <Routes>
            <Route>
                <Route path="/" element={<Login />} />
                <Route path="/profile" element={<ProfileDetails />} />
            </Route>
        </Routes>
    )
}
