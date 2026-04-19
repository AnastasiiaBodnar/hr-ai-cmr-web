'use client'

import React from 'react';
import Sidebar from './Sidebar';
import Image from 'next/image';

const MainLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-[103px] flex flex-col h-screen overflow-hidden">

        <header className="h-[66px] bg-white border-b border-black/17 flex items-center justify-end px-12 shrink-0">

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 relative rounded-full overflow-hidden border-2 border-gray-100">
              <Image
                src="/images/avatar.png"
                alt="Profile"
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
            <span className="text-gray-900 font-medium text-base">HR Manager</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-12 scroll-smooth">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
