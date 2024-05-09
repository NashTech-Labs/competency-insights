import React from "react";
import { Routes, Route } from "react-router-dom";
import {AddOkrPage, Login, ProfileDetails, TeamPage, UpdateOkr, StudioPage, ViewOkrPage} from "../pages";
import {ProtectedRoute} from "./ProtectedRoute";
import { DataProvider } from "../services/dataService";
 
export const AppRouters = () => {
 
    return (
      <>
      <Routes>
       <Route path="/" element={<Login/>} />
      </Routes>
       <DataProvider>
        <Routes>
          <Route path="/profile" element={<ProfileDetails/>} />
          <Route path="/team" element={<TeamPage  />}/>
          <Route path="/addokr" element={<AddOkrPage />}/>
          <Route path="/updateokr" element={<UpdateOkr />}/>
          <Route path="/viewokr" element={<ViewOkrPage />}/>
          <Route path="/studio" element={<StudioPage />}/>  
        </Routes>
        </DataProvider>
     </>
    )
}