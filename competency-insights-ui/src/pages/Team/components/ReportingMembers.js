import React from 'react';
import '../styles/FlipCard.css';

export const ReportingMembers = ({ employee }) => {
    const { name, position, employeeNo } = employee;

    return (
        <div className="flex-shrink-0 w-64 mx-4">
            <div className="flip-card-container-2">
                <div className="flip-card-2">
                    <div className="flip-card-inner">
                        <div className="flip-card-front">
                            <img src="/nashtech_logo.png" alt="Profile" className="profile-photo" />
                            <div className='card-content'>
                                <div className="profile-info">
                                    <h2 className="name">{name}</h2>
                                    <p className="position">{position}</p>
                                    <p className="testimonial">Employee No: {employeeNo}</p>
                                </div>
                            </div>
                        </div>
                        <div className="card-back">
                            <figure>
                                <div className="img-bg"></div>
                                <img src="https://t3.ftcdn.net/jpg/02/85/73/44/240_F_285734444_rrU3y3MjugOAE0i2ytPFieKj1ClB4Ugl.jpg" alt="Dark" />
                            </figure>
                            <ul>
                                <div className="font-bold text-dark text-lg tracking-wider px-5 py-2 border border-dark rounded-full bg-transparent transition duration-300 cursor-pointer mb-6 hover:text-primary hover:bg-opacity-20 active:translate-x-2">
                                    <button className="button inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                        style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)' }}
                                    >
                                        View Profile
                                    </button>
                                    <button className="button font-bold text-dark text-lg tracking-wider px-5 py-2 border border-dark rounded-full bg-transparent transition duration-300 cursor-pointer mb-6 hover:text-primary hover:bg-opacity-20 active:translate-x-2">Certificates: 1</button>
                                    <button className="button font-bold text-dark text-lg tracking-wider px-5 py-2 border border-dark rounded-full bg-transparent transition duration-300 cursor-pointer mb-6 hover:text-primary hover:bg-opacity-20 active:translate-x-2">Blogs: 4</button>
                                    <button className="button font-bold text-dark text-lg tracking-wider px-5 py-2 border border-dark rounded-full bg-transparent transition duration-300 cursor-pointer mb-6 hover:text-primary hover:bg-opacity-20 active:translate-x-2">TechHub: 3</button>
                                    <button className="button font-bold text-dark text-lg tracking-wider px-5 py-2 border border-dark rounded-full bg-transparent transition duration-300 cursor-pointer mb-6 hover:text-primary hover:bg-opacity-20 active:translate-x-2">Knolx: 3</button>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
