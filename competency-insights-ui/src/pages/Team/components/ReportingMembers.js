import React from 'react';

export const ReportingMembers = ({ employee }) => {
    

    return (
        <div class="flex min-h-screen items-center justify-center px-8">
            <div class="group h-96 w-80 [perspective:1000px]">
                <div class="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                    <div class="absolute w-full h-full backface-hidden font-sans bg-white text-black flex flex-col justify-center items-center p-20 shadow-md rounded-10">
                        <img class="w-100 h-100 rounded-full" src="/nashtech_logo.png" alt="" />
                        <h2 className="text-lg font-bold mb-2 leading-tight">{employee.name}</h2>
                        <p className="text-base leading-tight text-teal-500 font-bold">{employee.designation}</p>
                        <p className="text-gray-500 text-base leading-loose">{employee.empId}</p>
                    </div>
                    <div class="absolute inset-0 h-full w-full rounded-xl bg-gray-200 px-12 text-center text-black [transform:rotateY(180deg)] [backface-visibility:hidden] z-index: 2;">
                        <div className="back-side-bg absolute  bg-gray-100 rounded-xl"></div>

                        <div class="flex min-h-full flex-col items-center justify-center">
                            <button class="button font-bold text-lg px-5 py-2 border border-white rounded-full bg-transparent transition duration-300 cursor-pointer mb-6 hover:text-primary hover:bg-opacity-100 active:translate-x-2" >Certificates: 1</button>
                            <button class="button font-bold text-lg px-5 py-2 border border-white rounded-full bg-transparent transition duration-300 cursor-pointer mb-6 hover:text-primary hover:bg-opacity-100 active:translate-x-2">Blogs: 4</button>
                            <button class="button font-bold text-lg px-5 py-2 border border-white rounded-full bg-transparent transition duration-300 cursor-pointer mb-6 hover:text-primary hover:bg-opacity-100 active:translate-x-2">TechHub: 3</button>
                            <button class="button font-bold text-lg px-5 py-2 border border-white rounded-full bg-transparent transition duration-300 cursor-pointer mb-6 hover:text-primary hover:bg-opacity-100 active:translate-x-2">Knolx: 3</button>
                            <button class="button mt-2 rounded-md bg-neutral-800 py-1 px-2 text-sm hover:bg-neutral-300">Read More</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}