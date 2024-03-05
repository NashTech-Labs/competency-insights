import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <footer>
            <div  className="bg-white shadow dark:bg-gray-800">
            <div className="p-4 mx-auto max-w-screen-xl md:flex md:items-center md:justify-between md:p-6">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400"><Link to="/" className="hover:underline">Knashtech OKR</Link></span>
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400"><Link to="/" className="hover:underline">Terms and Conditions</Link></span>
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400"><Link to="https://nashtechglobal.go1percent.com/" className="hover:underline" target="_blank">Go1%</Link></span>

            </div>
            </div>
        </footer>
    )
}