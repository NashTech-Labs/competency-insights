import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import {AddOkrPage, Login, ProfileDetails, TeamPage, UpdateOkr, StudioPage, ViewOkrPage} from "../pages";
import {ProtectedRoute} from "./ProtectedRoute";
import { useMsal } from "@azure/msal-react";
import { DataProvider } from "../services/dataService";

export const AppRouters = () => {

    const [m_strUser, setm_strUser] = useState("");
    const [email, setEmail] = useState("");
    const { accounts } = useMsal();

    useEffect(() => {
        try {
          if (accounts && accounts.length > 0) {
            const username = accounts[0].username;
            setEmail(username);
            const profileName = username.substring(0, username.indexOf('@'));
            setm_strUser(profileName.split("."));
          }
        } catch (e) {
          console.error("Error while fetching username:", e);
        }
        sessionStorage.setItem("email",'Shiv.Oberoi@nashtechglobal.com')
        // Shiv.Oberoi@nashtechglobal.com
      }, [accounts]);

    return (
      <>
      <Routes>
       <Route path="/" element={<Login/>} />
      </Routes>
       <DataProvider>
        <Routes>
          <Route path="/profile" element={<ProfileDetails name={m_strUser[0] + " " + m_strUser[1]} />} />
          <Route path="/team" element={<TeamPage  name={m_strUser[0] + " " + m_strUser[1]} />} />
          <Route path="/addokr" element={<AddOkrPage name={m_strUser[0] + " " + m_strUser[1]} />} />
          <Route path="/updateokr" element={<UpdateOkr name={m_strUser[0] + " " + m_strUser[1]} />}/>
          <Route path="/studio" element={<StudioPage name={m_strUser[0] + " " + m_strUser[1]} />}/>
        </Routes>
        </DataProvider>
     </>
       
    )
}
                                                                             