'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
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
    <div className="w-[103px] min-h-screen bg-primary flex flex-col items-center fixed left-0 top-0">
      <div className="mt-[50px] mb-16">
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
