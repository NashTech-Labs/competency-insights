import React from 'react';


export const ReportingMembers = ({ employee }) => {
    const { name, position, employeeNo } = employee;

    return (
        <div class="flex min-h-screen items-center justify-center px-8">
        <div class="group h-96 w-80 [perspective:1000px]">
        <div class="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
            <div class="absolute w-full h-full backface-hidden font-sans bg-white text-black flex flex-col justify-center items-center p-20 shadow-md rounded-10">
            <img class="w-100 h-100 rounded-full" src="/nashtech_logo.png" alt="" />
            <h2 className="name">{name}</h2>
            <p className="position">{position}</p>
            <p className="testimonial">Employee No: {employeeNo}</p>
            </div>
            <div class="absolute inset-0 h-full w-full rounded-xl bg-black/80 px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
            <div class="flex min-h-full flex-col items-center justify-center">
            <button className="button font-bold text-dark text-lg tracking-wider px-5 py-2 border border-dark rounded-full bg-transparent transition duration-300 cursor-pointer mb-6 hover:text-primary hover:bg-opacity-20 active:translate-x-2">Certificates: 1</button>
            <button className="button font-bold text-dark text-lg tracking-wider px-5 py-2 border border-dark rounded-full bg-transparent transition duration-300 cursor-pointer mb-6 hover:text-primary hover:bg-opacity-20 active:translate-x-2">Blogs: 4</button>
            <button className="button font-bold text-dark text-lg tracking-wider px-5 py-2 border border-dark rounded-full bg-transparent transition duration-300 cursor-pointer mb-6 hover:text-primary hover:bg-opacity-20 active:translate-x-2">TechHub: 3</button>
            <button className="button font-bold text-dark text-lg tracking-wider px-5 py-2 border border-dark rounded-full bg-transparent transition duration-300 cursor-pointer mb-6 hover:text-primary hover:bg-opacity-20 active:translate-x-2">Knolx: 3</button>
            <button class="mt-2 rounded-md bg-neutral-800 py-1 px-2 text-sm hover:bg-neutral-900">Read More</button>
            </div>
            </div>
        </div>
        </div>
        </div>
    );
}
