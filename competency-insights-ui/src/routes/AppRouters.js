import { Routes, Route } from "react-router-dom";
import {Login, ProfilePage} from "../pages";
export const AppRouters = () => {
    return (
        <Routes>
            <Route>
                <Route path="/" element={<Login />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Route>
        </Routes>
    )
}
