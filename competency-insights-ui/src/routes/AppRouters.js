import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import {AddOkrPage, Login, ProfileDetails, TeamPage, UpdateOkr} from "../pages";
import {ProtectedRoute} from "./ProtectedRoute";
import { useMsal } from "@azure/msal-react";

export const AppRouters = () => {

    const [m_strUser, setm_strUser] = useState("");
    const [email, setEmail] = useState("");
    const { accounts } = useMsal();

        useEffect(() => {
        try {
            const username = accounts[0].username;
            setEmail(username);
            const profileName = username.substring(0, username.indexOf('@'));
            setm_strUser(profileName.split("."));
        } catch (e) {
            console.error("Error while fetching username:", e);
        }
    }, [accounts]);


    return (
        <Routes>
            <Route>
            <Route path="/" element={<Login />} />
            <Route path="/profile" element={<ProtectedRoute><ProfileDetails emailAddress={email} name={m_strUser[0] + " " + m_strUser[1]} /></ProtectedRoute>} />
            <Route path="/team" element={<ProtectedRoute><TeamPage /></ProtectedRoute>} />
            <Route path="/addokr" element={<ProtectedRoute><AddOkrPage emailAddress={email} /></ProtectedRoute>} />
            <Route path="/updateokr" element={<ProtectedRoute><UpdateOkr emailAddress={email} /></ProtectedRoute>}/>
            </Route>
        </Routes>
    )
}
                                                                             