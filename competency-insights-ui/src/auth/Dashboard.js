import React, { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import {useNavigate} from "react-router-dom";

function Dashboard() {
    const [m_strUser, setm_strUser] = useState("");
    const { instance , accounts } = useMsal();
    const navigate = useNavigate()


    useEffect(() => {
        try {
            const username = accounts[0].username;
            setm_strUser(username);
        } catch (e) {
            console.error("Error while fetching username:", e);
        }
    }, [accounts]);

    const handleLogout = () => {
        instance.logoutPopup();
        navigate("/");
    };

    if (m_strUser !== "") {
        return (
            <div className="App">
                <div>User: {m_strUser}</div>
                <button onClick={handleLogout}>Logout</button>
            </div>
        );
    } else {
        return <div>Please wait...</div>;
    }
}

export default Dashboard;
