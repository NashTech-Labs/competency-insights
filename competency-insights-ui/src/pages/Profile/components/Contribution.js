import {DropdownMenu} from "./DropdownMenu";

export const Contribution = ({ contributionType }) => {
  if (!contributionType) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <div className="hidden lg:block px-4 sm:px-6 lg:px-8 py-4 w-full">
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
        <div className="px-4 sm:px-6 lg:px-8 py-4 w-full" key={index}>
          <div className="grid lg:grid-cols-5 sm:grid-cols-4 gap-2 items-center">
            <div className="bg-white p-4 rounded-md shadow-md lg:col-span-2 sm:col-span-1">
              <p className="text-lg font-bold">{item.Title}</p>

            </div>
            <div className="bg-white p-4 rounded-md shadow-md col-span-1">
              <p>{item.RadarTechnology}</p>
            </div>
            <div className="bg-white p-4 rounded-md shadow-md col-span-1 flex items-center justify-center">
              <p>{item.Status[0]}</p>
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
