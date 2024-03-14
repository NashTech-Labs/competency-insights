import React, { useEffect, useState } from "react";
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import { Contribution } from "./components/Contribution";
import { Footer, Header, Navbar } from "../../components";
import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";
import { PermanentDrawerLeft } from "../../components/Layout/Navbar/TestNavBar";

export const ProfileDetails = () => {
    const [user, setUser] = useState({});
    const [categories, setCategories] = useState({});
    const [category, setCategory] = useState("Blogs");
    const [m_strUser, setm_strUser] = useState("");
    const { accounts } = useMsal();
    const navigate = useNavigate();
    const [filterTechnology, setFilterTechnology] = useState(null);
    const [filterStatus, setFilterStatus] = useState(null);
    const [filteredContributions, setFilteredContributions] = useState(null);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userResponse, categoriesResponse] = await Promise.all([
                    fetch('Data/userdata.json'),
                    fetch('Data/categories.json')
                ]);

                if (!userResponse.ok) {
                    throw new Error('Failed to fetch user data');
                }
                if (!categoriesResponse.ok) {
                    throw new Error('Failed to fetch categories');
                }

                const userData = await userResponse.json();
                const categoriesData = await categoriesResponse.json();
                setUser(userData);
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleCategoryClick = (selectedCategory) => {
        setCategory(selectedCategory);
    };

    const applyFilters = () => {
        if (user.Contributions && user.Contributions[category]) {
            const filtered = user.Contributions[category].filter(contribution => {
                // Apply technology filter if set
                const techFilterPassed = !filterTechnology || contribution.RadarTechnology === filterTechnology;
                // Apply status filter if set
                const statusFilterPassed = !filterStatus || contribution.Status.includes(filterStatus);
                // Return true only if both filters pass
                return techFilterPassed && statusFilterPassed;
            });
    
            setFilteredContributions(filtered);
        }
    };
    

    const clearFilters = () => {
        setFilterTechnology(null);
        setFilterStatus(null);
        setFilteredContributions(null);
    };

    return (
        <>
        {/* <Navbar /> */}
        <PermanentDrawerLeft />
            <section className="bg-gray-200 p-4 min-h-screen ml-60 px-20 mt-10">
                <div className="flex flex-col sm:flex-row items-center bg-white">
                    <div className="w-60 m-5">
                        <img
                            src="https://8bf962be.rocketcdn.me/wp-content/uploads/2023/03/nashTech-logo-red.png"
                            className="mx-auto"
                            alt="User"
                        />
                    </div>
                    <div className="lg:order-2 lg:w-full lg:p-4 text-center sm:text-left">
                        <div className="sm:items-center font-bold text-xl mb-2">{user.Name}</div>
                        <div className="flex flex-wrap justify-center sm:justify-start">
                            <div className="mr-4 mb-2">
                                <FmdGoodOutlinedIcon />
                                {user.location}
                            </div>
                            <div className="mr-4 mb-2">
                                <MailOutlineOutlinedIcon />
                                {user.Email}
                            </div>
                            <div className="mr-4 mb-2">
                                <CallOutlinedIcon />
                                {user.contact}
                            </div>
                            <hr className="w-full mt-4 mb-4" />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="flex flex-col">
                                <label className="text-gray-700 text-sm">EMP NO</label>
                                <p>{user.EmpId}</p>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-gray-700 text-sm">Job title</label>
                                <p>{user.Designation}</p>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-gray-700 text-sm">Department</label>
                                <p>{user.Department}</p>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-gray-700 text-sm">DOB</label>
                                <p>{user.DateOfBirth}</p>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-gray-700 text-sm">Date of Joining</label>
                                <p>{user.DateOfJoinig}</p>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-gray-700 text-sm">Reporting To</label>
                                <p>{user.ReportingManager}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="w-full bg-white mt-4">
                    <div className="lg:order-2 lg:w-1/2 p-2">
                        <table className="w-full">
                            <tr>
                                {Object.keys(categories).map((key) => (
                                    <th
                                        key={key}
                                        className={`text-sm p-1 cursor-pointer ${category === categories[key] ? "bg-gray-300" : ""}`}
                                        onClick={() => handleCategoryClick(categories[key])}
                                    >
                                        {categories[key]}
                                        {category === categories[key] && (
                                            <button
                                                onClick={() => setShowFilters(!showFilters)}
                                                type="button"
                                                data-drawer-dismiss="drawer-disable-body-scrolling"
                                                aria-controls="drawer-disable-body-scrolling"
                                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-1/2 right-2 transform -translate-y-1/2"
                                            >
                                                <svg
                                                    aria-hidden="true"
                                                    className="w-5 h-5"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                                <span className="sr-only">Close Filters</span>
                                            </button>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        </table>
                    </div>
                </section>
                {/* Filter */}
                <div className="flex justify-between item-center">
                    {showFilters && (
                        <div className="ml-auto space-x-4">
                            {/* Technology Filter */}
                            <select
                                value={filterTechnology}
                                onChange={(e) => setFilterTechnology(e.target.value)}
                                className="rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500"
                            >
                                <option value="">All Technologies</option>
                                {/* Options dynamically generated from user data */}
                                {user.Contributions && user.Contributions[category] &&
                                    [...new Set(user.Contributions[category].map(contribution => contribution.RadarTechnology))].map(technology => (
                                        <option key={technology} value={technology}>{technology}</option>
                                    ))
                                }
                            </select>
                            {/* Status Filter */}
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500"
                            >
                                <option value="">All Status</option>
                                <option value="Approved">Approved</option>
                                <option value="In-Review">In Review</option>
                                <option value="Published">Published</option>
                            </select>
                            <button
                                onClick={() => applyFilters()}
                                className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none"
                            >
                                Apply Filters
                            </button>
                            <button
                                onClick={() => clearFilters()}
                                className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>
                {user.Contributions && user.Contributions[category] && (
                    <Contribution contributionType={filteredContributions || user.Contributions[category]} />
                )}
                <Footer />
            </section>
        </>
    );
};
