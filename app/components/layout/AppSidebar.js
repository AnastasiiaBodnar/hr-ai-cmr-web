'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Sidebar = ({ isOpen, onClose }) => {
    const pathname = usePathname();

    const navItems = [
        {
            name: 'dashboard',
            icon: '/images/Dashboard.png',
            path: '/dashboard',
        },
        {
            name: 'candidates',
            icon: '/images/Candidates.png',
            path: '/candidates',
        },
        {
            name: 'vacancy',
            icon: '/images/Vacancy.png',
            path: '/vacancy',
        },
    ];

    return (
        <div className={`w-[103px] min-h-screen bg-primary flex flex-col items-center fixed left-0 top-0 z-50 transition-transform duration-300 md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            {/* Mobile close button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-2 text-white/50 hover:text-white md:hidden"
            >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <div className="mt-[50px] mb-16 px-4">
                <div className="relative w-[52px] h-[39px]">
                    <Image
                        src="/images/logo.png"
                        alt="HR CRM Logo"
                        fill
                        sizes="52px"
                        className="object-contain"
                        priority
                    />
                </div>
            </div>

            <nav className="flex flex-col gap-6 flex-1 w-full pt-4">
                {navItems.map((item) => {
                    const isActive = pathname.startsWith(item.path);
                    return (
                        <Link
                            key={item.name}
                            href={item.path}
                            className="flex flex-col items-center w-full group transition-all"
                        >
                            <div className={`w-20 h-14 relative transition-all rounded-xl flex items-center justify-center ${isActive ? 'bg-white/10' : 'group-hover:bg-white/5'}`}>
                                <div className="relative w-full h-full p-2">
                                    <Image
                                        src={item.icon}
                                        alt={item.name}
                                        fill
                                        sizes="80px"
                                        className="object-contain brightness-0 invert opacity-90 transition-opacity group-hover:opacity-100"
                                    />
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
};

export default Sidebar;
