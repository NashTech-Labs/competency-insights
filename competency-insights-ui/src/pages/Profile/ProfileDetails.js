import React, { useEffect, useState } from "react";
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import { Contribution } from "./components/Contribution";
import { PermanentDrawerLeft } from "../../components/Layout/NavBar";
import { SkeletonProfile } from "../../components/Layout/SkeletonProfile";
import useDataFetching from "../../services/useDataFetching";
import {useMsal} from "@azure/msal-react";

export const ProfileDetails = ({ emailAddress, name }) => {
    const [user, setUser] = useState(null);
    const [okrs, setOKR] = useState(null);
    const [categories, setCategories] = useState({});
    const [category, setCategory] = useState("Blogs");
    const { instance } = useMsal();
    const { data: categoriesData, isLoading: categoriesIsLoading } = useDataFetching('Data/categories.json', instance);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (emailAddress) {
                    const storedUserData = localStorage.getItem("userData");
                    const storedOkrData = localStorage.getItem("okrsData");
                    if (storedUserData) {
                        setUser(JSON.parse(storedUserData));
                        setOKR(JSON.parse(storedOkrData));
                    }
                    else
                    {
                        const profilePageUrl = `${process.env.REACT_APP_BACKEND_APP_URI}${process.env.REACT_APP_PROFILE_PAGE_URL}/${encodeURIComponent(emailAddress)}`;
                        const getOkrDataUrl = `${process.env.REACT_APP_BACKEND_APP_URI}${process.env.REACT_APP_GET_OKR_PAGE_URL}/${encodeURIComponent(emailAddress)}`;

                        const accessToken = sessionStorage.getItem("token");
                        const response = await fetch(profilePageUrl, {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                        });

                        const okrsDataResponse = await fetch(getOkrDataUrl, {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                        });
                        if (response.ok) {
                            const userData = await response.json();
                            const okrsData = await okrsDataResponse.json();
                            setUser(userData);
                            setOKR(okrsData);
                            localStorage.setItem("userData", JSON.stringify(userData));
                            localStorage.setItem("okrsData" , JSON.stringify(okrsData));
                        }
                    }
                }
                else{
                    setUser('loading');
                }
            } catch (error) {
                setUser(null);
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, [emailAddress]);

    useEffect(() => {
        if (categoriesData) {
            setCategories(categoriesData);
        }
    }, [categoriesData]);

    const handleCategoryClick = (selectedCategory) => {
        setCategory(selectedCategory);
    };
    let content;
    if (user === 'loading' || categoriesIsLoading) {
        content = <SkeletonProfile />;
    } else if (user === null) {
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

                {okrs && (
                    <div>
                        <Contribution contributionType={category ? okrs.filter(okr => okr.activity === category) : okrs} />
                    </div>
                )}
            </>
        );
    }

    return (
        <>
            <PermanentDrawerLeft name={name} />
            <section className="bg-gray-200 p-4 min-h-screen ml-60 px-20 mt-10">
                {content}
            </section>
        </>
    );
};