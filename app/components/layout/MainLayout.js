'use client'

import React from 'react';
import Sidebar from './Sidebar';
import Image from 'next/image';

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div className="flex min-h-screen bg-background relative overflow-x-hidden">
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="flex-1 md:ml-[103px] flex flex-col h-[100dvh] overflow-hidden transition-all duration-300">

        <header className="h-[66px] bg-white border-b border-black/17 flex items-center justify-between md:justify-end px-4 md:px-12 shrink-0 z-30">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden p-2 -ml-2 text-gray-600 hover:text-primary transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>

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

        <main className="flex-1 overflow-y-auto px-12 pt-6 pb-12 scroll-smooth">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
