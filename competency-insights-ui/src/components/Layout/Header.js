import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
    const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("darkMode")) || false);
    const [shouldDropDownOpen, setShouldDropDownOpen] = useState(false);
    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
        
        if(darkMode){
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }, [darkMode]);
    return (
        <header >
            <nav className="bg-white dark:bg-gray-900">
                <div className="border-b border-slate-200 dark:border-b-0 flex flex-wrap justify-between items-center mx-auto  px-4 md:px-6 py-3">

                    <Link to="/" className="flex items-center">
                        <img src="data:image/jpeg;base64,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" className="h-8" alt="Logo" />
                        <span className="text-2xl font-semibold whitespace-nowrap dark:text-white">Java Competency</span>
                    </Link>

                    <form className="flex items-center max-w-sm mx-auto">
                       
                        <div className="relative w-full">

                            <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search employee name..." required />
                        </div>
                        <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>
                    </form>

                    <div className="flex items-center space-x-3">
                    <span onClick={() => setDarkMode(!darkMode)} className="cursor-pointer text-xl text-gray-700 dark:text-white mr-5 bi bi-gear-wide-connected"></span>

                        <span onClick={() => setShouldDropDownOpen(!shouldDropDownOpen)} className="bi bi-person-circle cursor-pointer text-2xl text-gray-700 dark:text-white"></span>


                        {shouldDropDownOpen && <div id="dropdownAvatar" className="select-none	absolute top-10 right-0 z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                            <div className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                                <div className="font-medium truncate">sabia</div>
                            </div>
                            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">
                                <li>
                                    <Link to="/" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Profile</Link>
                                </li>
                                <li>
                                    <Link to="/" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                                </li>
                            </ul>
                            <div className="py-1">
                                <span className="cursor-pointer block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Log out</span>
                            </div>
                        </div>}

                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;