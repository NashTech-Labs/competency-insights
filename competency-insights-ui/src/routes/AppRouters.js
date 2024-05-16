import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import {AddOkrPage, Login, ProfileDetails, TeamPage, UpdateOkr, StudioPage, ViewOkrPage} from "../pages";
import {ProtectedRoute} from "./ProtectedRoute";
import { DataProvider } from "../services/dataService";
import { useMsal } from "@azure/msal-react";
 
export const AppRouters = () => {
  const [m_strUser, setm_strUser] = useState("");
    const [email, setEmail] = useState("");
    const { accounts } = useMsal();
 
    useEffect(() => {
        try {
          if (accounts && accounts.length > 0) {
            const username = accounts[0].username;
            setEmail(username);
          }
        } catch (e) {
          console.error("Error while fetching username:", e);
        }
        sessionStorage.setItem("email",email)
      }, [accounts]);
    return (
      <>
      <Routes>
       <Route path="/" element={<Login/>} />
      </Routes>
       <DataProvider email={email}>
        <Routes>
          <Route path="/profile" element={<><ProfileDetails /></>} />
          <Route path="/team" element={<><TeamPage  /></> }/>
          <Route path="/addokr" element={<><AddOkrPage /> </>}/>
          <Route path="/updateokr" element={<><UpdateOkr /></>}/>
          <Route path="/viewokr" element={<><ViewOkrPage /></>}/>
          <Route path="/studio" element={<><StudioPage /></>}/>     
        </Routes>
        </DataProvider>
     </>
       
    )
}