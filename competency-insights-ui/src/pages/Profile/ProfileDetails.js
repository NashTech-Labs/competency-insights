import React, { useEffect, useState } from "react";
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import { PermanentDrawerLeft } from "../../components/Layout/NavBar";
import { useDataProvider } from '../../services/dataService';
import UseDataFetching from "../../services/useDataFetching";
import ContributionGrid from "./components/ContributionGrid";

export const ProfileDetails = () => {

    const [categories, setCategories] = useState({});
    const [category, setCategory] = useState("Blog");
    const { user, okr } = useDataProvider()

    const getCategory = async () => {
        const categoriesData = await UseDataFetching('Data/categories.json');
        if (categoriesData) {
            setCategories(categoriesData);
        }
    }
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                getCategory();
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, []);

    const handleCategoryClick = (selectedCategory) => {
        setCategory(selectedCategory);
    };

    let content;

    if (!user || user.length===0) {
        content = (
            <div className="flex justify-center items-center h-screen">
                <img
                    src="/no_data_found.jpeg"
                    className="mx-auto"
                    alt="No data found"
                />
            </div>
        );
    } else {
        content = (
            <>
                <div className="flex flex-col sm:flex-row items-center bg-white">
                    <div className="w-60 m-5">
                        <img
                            src="/no_profile_photo.jpeg"
                            className="mx-auto"
                            alt="User"
                        />
                    </div>
                    <div className="lg:order-2 lg:w-full lg:p-4 text-center sm:text-left">
                        <div className="sm:items-center font-bold text-xl mb-2">{user.name}</div>
                        <div className="flex flex-wrap justify-center sm:justify-start">
                            {user.location && (
                                <div className="mr-4 mb-2">
                                    <FmdGoodOutlinedIcon />
                                    {user.location}
                                </div>
                            )}
                            {user.email && (
                                <div className="mr-4 mb-2">
                                    <MailOutlineOutlinedIcon />
                                    {user.email}
                                </div>
                            )}
                            {user.contact && (
                                <div className="mr-4 mb-2">
                                    <CallOutlinedIcon />
                                    {user.contact}
                                </div>
                            )}
                            <hr className="w-full mt-4 mb-4" />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            {user.empId && (
                                <div className="flex flex-col">
                                    <label className="text-gray-700 text-sm">EMP NO</label>
                                    <p>{user.empId}</p>
                                </div>
                            )}
                            {user.designation && (
                                <div className="flex flex-col">
                                    <label className="text-gray-700 text-sm">Job title</label>
                                    <p>{user.designation}</p>
                                </div>
                            )}
                            {user.department && (
                                <div className="flex flex-col">
                                    <label className="text-gray-700 text-sm">Competency</label>
                                    <p>{user.department}</p>
                                </div>
                            )}
                            {user.dateOfBirth && (
                                <div className="flex flex-col">
                                    <label className="text-gray-700 text-sm">DOB</label>
                                    <p>{user.dateOfBirth}</p>
                                </div>
                            )}
                            {user.dateOfJoining && (
                                <div className="flex flex-col">
                                    <label className="text-gray-700 text-sm">Date of Joining</label>
                                    <p>{user.dateOfJoining}</p>
                                </div>
                            )}
                            {user.reportingManager && (
                                <div className="flex flex-col">
                                    <label className="text-gray-700 text-sm">Reporting To</label>
                                    <p>{user.reportingManager}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <section className="w-full bg-white mt-4">
                    {user && (
                        <div className="lg:order-2 lg:w-1/2 p-2">
                            <table className="w-full">
                                <tbody>
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
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>
                {okr.length!==0 && (
                    <div>
                        <ContributionGrid contributionType={category ? okr.filter(okrs=> okrs.activity === category) : okr} />

                    </div>
                )}
            </>
        );
    }

    return (
        <>
            <PermanentDrawerLeft name={user.name} />
            <section className="bg-gray-200 p-4 min-h-screen ml-40 px-20">
                {content}
            </section>
        </>
    );
};