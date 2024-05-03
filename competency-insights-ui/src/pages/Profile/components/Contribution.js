import { DropdownMenu } from "./DropdownMenu";

export const Contribution = ({ contributionType }) => {
  if (!contributionType) {
    // return <div>No data available</div>;
    return (
      <div className="flex justify-center items-center h-screen">
        <img
          src="/no_data_found.jpeg"
          className="mx-auto"
          alt="No data found"
        />
      </div>
    )
  }
  else {
    return (
      <div>
        <div className="lg:block px-4 sm:px-6 lg:px-2 py-4 w-full">
          <div className="grid lg:grid-cols-5 sm:grid-cols-4 gap-2 items-center">
            <div className="p-1 text-black-700 text-sm shadow-md lg:col-span-2 sm:col-span-1 flex items-center justify-center">
              <p>Title</p>
            </div>
            <div className="p-1 text-black-700 text-sm shadow-md col-span-1 flex items-center justify-center">
              <p>Technology</p>
            </div>
            <div className="p-1 text-black-700 text-sm shadow-md col-span-1 flex items-center justify-center">
              <p>Status</p>
            </div>
          </div>
        </div>

        {contributionType.map((item, index) => (
          <div className="px-4 sm:px-6 lg:px-1 py-2 w-full" key={index}>
            <div className="grid lg:grid-cols-5 sm:grid-cols-4 gap-2 items-center">
              <div className="bg-white p-4 rounded-md shadow-md lg:col-span-2 sm:col-span-1">
                <p className="text-lg font-bold">{item.title}</p>

              </div>
              <div className="bg-white p-4 rounded-md shadow-md col-span-1">
                <p>{item.radarTechnology}</p>
              </div>
              <div className="bg-white p-4 rounded-md shadow-md col-span-1 flex items-center justify-center">
                <p>{item.status}</p>
              </div>
              <div className="p-2 rounded-md col-span-1 flex items-center justify-center">
                <DropdownMenu />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
