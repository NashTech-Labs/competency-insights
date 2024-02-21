

export default function Home() {
  return ( <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
  <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
    <img className="w-24 h-24 mx-auto" src="/nashtech_logo.png" alt="" width="384" height="512" />
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
  </div>
</div>
  );
}
