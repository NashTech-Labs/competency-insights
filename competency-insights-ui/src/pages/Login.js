import { useMsal } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import {useNavigate} from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate()
    const { instance } = useMsal();

    const handleLogin = () => {
        instance.loginRedirect({
            scopes: ["openid", "profile", "email"],
            interactionType: InteractionType.Redirect,
        });
    };

    const handleLoginAndRedirect = () => {
        handleLogin();
        navigate("/profile");
    };

    return (
            <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
                <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
                    <img className="w-24 h-24 mx-auto" src="/nashtech_logo.png" alt="" width="384" height="512" />
                    <h1 className="text-3xl font-bold text-center text-gray-700">Login to Company Insights</h1>
                    <form className="mt-6">
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                        <div className="mt-2">
                            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                                Login
                            </button>
                        </div>
                    </form>
                    <div className="relative flex items-center justify-center w-full mt-6 border border-t">
                        <div className="absolute px-5 bg-white">Or</div>
                    </div>
                    <div className="flex mt-4 gap-x-2">
                        <button
                            type="button"
                            onClick={handleLoginAndRedirect}
                            className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                                className="w-5 h-5 fill-current"
                            >
                                <path d="m0 0v10.719h10.719v-10.719zm13.279 0v10.719h10.719v-10.719zm-13.279 13.281v10.719h10.719v-10.719zm13.279 0v10.719h10.719v-10.719z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        )
}
