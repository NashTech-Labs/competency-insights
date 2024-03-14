import { Routes, Route } from "react-router-dom";
import {AddOkrPage, Login, ProfileDetails, TeamPage, UpdateOkr} from "../pages";
import {ProtectedRoute} from "./ProtectedRoute";
export const AppRouters = () => {
    return (
        <Routes>
            <Route>
                <Route path="/" element={<Login />} />
                <Route path="/profile" element={<ProfileDetails />} />
                <Route path="/team" element={<TeamPage />} />
                <Route path="/addokr" element={<AddOkrPage/>} />
                <Route path="/updateokr" element={<UpdateOkr/>}/>
            </Route>
        </Routes>
    )
}
                                                                             