import { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import {useNavigate} from "react-router-dom";
import { Footer, Header, Navbar } from "../../components";

export const ProfilePage = () => {
    const [m_strUser, setm_strUser] = useState("");
    const { accounts } = useMsal();
    const navigate = useNavigate()

        return (
            <div>
            <Header />
            <Footer />
            </div>
        );
}
