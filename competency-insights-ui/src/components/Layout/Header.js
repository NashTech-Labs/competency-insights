import React, { useState, useEffect } from 'react';
import { useMsal } from "@azure/msal-react";
import { Link } from 'react-router-dom';
import {useNavigate} from "react-router-dom";

export const Header = () => {
    const [m_strUser, setm_strUser] = useState("");
    const { instance , accounts } = useMsal();
    const navigate = useNavigate();

    const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("darkMode")) || false);
    const [shouldDropDownOpen, setShouldDropDownOpen] = useState(false);
    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(darkMode));

        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    useEffect(() => {
        try {
            const username = accounts[0].username;
            const profileName = username.substring(0, username.indexOf('@'));
            setm_strUser(profileName.split("."));
        } catch (e) {
            console.error("Error while fetching username:", e);
        }
    }, [accounts]);

    const handleLogout = () => {
        instance.logoutRedirect({
            postLogoutRedirectUri: "/",
        });
    };

    return (
        <header >
            <nav className="bg-white dark:bg-gray-900">
                <div className="border-b border-slate-200 dark:border-b-0 flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-3">

                    <Link to="/" className="flex items-center">
                        <img src="/nashtech_logo.png" className="h-8" alt="Logo" />
                        <span className="text-2xl font-semibold whitespace-nowrap dark:text-white">Competency Insights</span>
                    </Link>

                    {/* <form className="flex items-center max-w-sm mx-auto">

                        <div className="relative w-full">

                            <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search employee name..." required />
                        </div>
                        <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>
                    </form> */}

                    <div >
                        <span onClick={() => setDarkMode(!darkMode)} className="cursor-pointer text-xl text-gray-700 dark:text-white mr-5 bi bi-gear-wide-connected"></span>

                        <span onClick={() => setShouldDropDownOpen(!shouldDropDownOpen)} className="bi bi-person-circle cursor-pointer text-2xl text-gray-700 dark:text-white"></span>


                        {shouldDropDownOpen && <div id="dropdownAvatar" className="select-none	absolute top-10 right: initial; **margin-left: -5px;** z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                            <div className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                                <div className="font-medium truncate">{m_strUser[0]} {m_strUser[1]}</div>
                            </div>
                            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">
                                <li>
                                    <Link to="/profile" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Profile</Link>
                                </li>
                            </ul>
                            <div className="py-1">
                                <span onClick={handleLogout} className="cursor-pointer block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Log out</span>
                            </div>
                        </div>}

                    </div>
                </div>
            </nav>
        </header>
    );
};
