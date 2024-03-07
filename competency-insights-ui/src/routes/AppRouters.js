import { Routes, Route } from "react-router-dom";
import {Login, ProfileDetails} from "../pages";
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
                                                                             