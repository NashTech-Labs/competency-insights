import React, { useState, useEffect, useRef } from 'react';
import { useMsal } from "@azure/msal-react";
import { Link } from 'react-router-dom';

export const Header = () => {
    const [m_strUser, setm_strUser] = useState("");
    const { instance , accounts } = useMsal();
    const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("darkMode")) || false);
    const [shouldDropDownOpen, setShouldDropDownOpen] = useState(false);
    const headerRef = useRef(null);

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

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (headerRef.current && !headerRef.current.contains(event.target)) {
                setShouldDropDownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    const handleLogout = () => {
        instance.logoutRedirect({
            postLogoutRedirectUri: "/",
        });
    };

    const headerHeight = headerRef.current ? headerRef.current.clientHeight : 0;

    return (
        <header ref={headerRef}>
            <nav className="bg-white dark:bg-gray-900 flex items-center" style={{ padding: '25px 0' }}>
                <div className="w-full flex justify-between items-center mx-auto px-4 md:px-6 py-3">
                    <Link to="/" className="flex items-center">
                        <img src="/nashtech_logo.png" className="h-8" alt="Logo" />
                        <span className="text-4xl font-semibold whitespace-nowrap dark:text-white">Competency Insights</span>
                    </Link>
                    <div>
                        <span onClick={() => setDarkMode(!darkMode)} className="cursor-pointer text-xl text-gray-700 dark:text-white mr-5 bi bi-gear-wide-connected" style={{ fontSize: '2rem',  marginRight: '70px' }}></span>
                        <span onClick={() => setShouldDropDownOpen(!shouldDropDownOpen)} className="bi bi-person-circle cursor-pointer text-2xl text-gray-700 dark:text-white" style={{ fontSize: '2rem', marginRight: '50px'}}></span>
                        {shouldDropDownOpen && 
                            <div id="dropdownAvatar" className="select-none absolute top-full right-0 z-10 w-[200px]  bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600" style={{ top: headerHeight }}>
                                <div className="py-3 px-4 text-[1rem] text-sm text-gray-900 dark:text-white">
                                    <div className="font-medium truncate">{m_strUser[0]} {m_strUser[1]}</div>
                                </div>
                                <ul className="py-1 text-[1rem] text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">
                                    <li>
                                        <Link to="/profile" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Profile</Link>
                                    </li>
                                </ul>
                                <div className="py-1">
                                    <span onClick={handleLogout} className="cursor-pointer block py-2 px-4 text-[1rem] text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Log out</span>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </nav>
        </header>
    );
};
