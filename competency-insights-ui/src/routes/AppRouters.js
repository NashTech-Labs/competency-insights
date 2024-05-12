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
          <Route path="/profile" element={<ProtectedRoute><ProfileDetails /></ProtectedRoute>} />
          <Route path="/team" element={<ProtectedRoute><TeamPage  /></ProtectedRoute> }/>
          <Route path="/addokr" element={<ProtectedRoute><AddOkrPage /> </ProtectedRoute>}/>
          <Route path="/updateokr" element={<ProtectedRoute><UpdateOkr /></ProtectedRoute>}/>
          <Route path="/viewokr" element={<ProtectedRoute><ViewOkrPage /></ProtectedRoute>}/>
          <Route path="/studio" element={<ProtectedRoute><StudioPage /></ProtectedRoute>}/>     
        </Routes>
        </DataProvider>
     </>
       
    )
}