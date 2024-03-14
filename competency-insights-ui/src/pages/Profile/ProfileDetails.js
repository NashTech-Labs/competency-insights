import React, { useEffect, useState } from "react";
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import { Contribution } from "./components/Contribution";
import { Footer, Header, Navbar } from "../../components";
import { useMsal } from "@azure/msal-react";
import {useNavigate} from "react-router-dom";
import {PermanentDrawerLeft} from "../../components/Layout/Navbar/TestNavBar"
import useDataFetching from "../../services/useDataFetching";

export const ProfileDetails = () => {
    const [user, setUser] = useState({});
    const [categories, setCategories] = useState({});
    const [category, setCategory] = useState("Blogs");
    const { accounts, instance } = useMsal();
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    // Using the custom hook for fetching user and categories data
    const { data: userData, isLoading: userIsLoading, error: userError } = useDataFetching(apiUrl, instance);
    const { data: categoriesData, isLoading: categoriesIsLoading, error: categoriesError } = useDataFetching('Data/categories.json', instance);

    useEffect(() => {
        if (userData) {
            setUser(userData);
        }
        if (categoriesData) {
            setCategories(categoriesData);
        }
    }, [userData, categoriesData]);

    const handleCategoryClick = (selectedCategory) => {
        setCategory(selectedCategory);
    };

    if (userIsLoading || categoriesIsLoading) {
        return <div>Loading...</div>; // Render loading indicator while data is being fetched
    }

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
                                <FmdGoodOutlinedIcon/>
                                {user.location}
                            </div>
                            <div className="mr-4 mb-2">
                                <MailOutlineOutlinedIcon/>
                                {user.Email}
                            </div>
                            <div className="mr-4 mb-2">
                                <CallOutlinedIcon/>
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
                                    </th>
                                ))}
                            </tr>
                        </table>
                    </div>
                </section>
                {user.Contributions && user.Contributions[category] && (
                    <Contribution contributionType={user.Contributions[category]} />
                )}
                <Footer />
                </section>
        </>
    )
}
