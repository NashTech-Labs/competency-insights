import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";
import { msalConfig } from "../auth/authConfig";

export const Login = () => {
  const navigate = useNavigate();
  const { instance } = useMsal();

  const handleLogin = async () => {
    try {
      // Initiate the login process using Microsoft authentication
      const loginResponse = await instance.loginPopup({
        scopes: [`${msalConfig.auth.clientId}/.default`],
      });

      // Check for errors in the login response
      if (loginResponse && loginResponse.error) {
        console.error("Login failed:", loginResponse.error);
        return;
      }

      // Retrieve user ID and user name after successful login
      const account = instance.getActiveAccount();
      const userId = account?.idTokenClaims?.oid;
      const userName = account?.idTokenClaims?.name;

      // Store user ID and user name in session storage
      sessionStorage.setItem("userId", userId);
      sessionStorage.setItem("userName", userName);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLoginAndRedirect = async () => {
    // Handle login and redirect to the profile page
    await handleLogin();

    // Redirect to the profile page after successful login
    navigate("/profile");
  };

  return (
    <div className="min-w-screen flex items-center justify-center bg-gray-50 py-20 px-4 sm:px-6 lg:px-20 rounded-lg shadow-lg">
      <div className="max-w-md w-full space-y-8 ">
        <div>
          <img
            className="mx-auto h-24 w-auto"
            src="/nashtech_logo.png"
            alt="Nashtech Logo"
          />
          <h1 className="text-center text-3xl font-extrabold text-gray-900">
            Login to Company Insights
          </h1>
        </div>
        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                placeholder="Email"
              />
            </div>
          </div>

          <div>
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Login
            </button>
          </div>
        </form>
        <div className="relative flex items-center justify-center w-full mt-6 border border-t">
          <div className="absolute px-5 bg-gray-50">Or</div>
        </div>

        <div className="mt-4 flex gap-x-2">
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
  );
};
