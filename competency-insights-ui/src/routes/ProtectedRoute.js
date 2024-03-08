import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({children}) => {
    const userId = sessionStorage.getItem("userId");
    const userName = sessionStorage.getItem("userName");

  return userId && userName ? children : <Navigate to="/" />
}