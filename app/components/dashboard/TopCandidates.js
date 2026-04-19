'use client'

import React from 'react';
import Image from 'next/image';

const TopCandidates = () => {
  return (
    <div className="bg-white rounded-[10px] shadow-[0_0_2px_rgba(0,0,0,0.25)] overflow-hidden h-full flex flex-col">

      <div className="px-6 border-b-[0.8px] border-[#DCDCDC] flex items-center h-[60px]">
        <h3 className="text-xl font-bold text-gray-900">Top candidates</h3>
      </div>

      <div className="flex-1 p-6 space-y-6 overflow-y-auto">

        <div className="flex items-center justify-between group gap-2">
          <div className="flex items-center gap-2 md:gap-3 min-w-0">
            <div className="w-10 h-10 md:w-12 md:h-12 relative rounded-full overflow-hidden border border-gray-50 shrink-0">
              <Image src="/images/avatar.png" alt="Olga Holodenina" fill sizes="48px" className="object-cover" />
            </div>
            <div className="min-w-0">
              <h4 className="font-bold text-gray-900 text-sm md:text-base truncate">Olga Holodenina</h4>
              <p className="text-[12px] md:text-sm text-gray-400 font-medium truncate">Frontend Developer</p>
            </div>
          </div>
          <div className="flex flex-col items-end shrink-0">
            <span className="inline-block px-2 md:px-3 py-1 bg-success rounded-full text-[9px] md:text-[10px] font-bold text-white mb-0.5 whitespace-nowrap">
              ✓ 95% match
            </span>
            <p className="text-[9px] md:text-[10px] text-gray-300 font-medium">3 day ago</p>
          </div>
        </div>

        <div className="flex items-center justify-between group gap-2">
          <div className="flex items-center gap-2 md:gap-3 min-w-0">
            <div className="w-10 h-10 md:w-12 md:h-12 relative rounded-full overflow-hidden border border-gray-50 shrink-0">
              <Image src="/images/avatar.png" alt="Andriy Shevchenko" fill sizes="48px" className="object-cover" />
            </div>
            <div className="min-w-0">
              <h4 className="font-bold text-gray-900 text-sm md:text-base truncate">Andriy Shevchenko</h4>
              <p className="text-[12px] md:text-sm text-gray-400 font-medium truncate">PM</p>
            </div>
          </div>
          <div className="flex flex-col items-end shrink-0">
            <span className="inline-block px-2 md:px-3 py-1 bg-success rounded-full text-[9px] md:text-[10px] font-bold text-white mb-0.5 whitespace-nowrap">
              ✓ 92% match
            </span>
            <p className="text-[9px] md:text-[10px] text-gray-300 font-medium">1 day ago</p>
          </div>
        </div>

        <div className="flex items-center justify-between group gap-2">
          <div className="flex items-center gap-2 md:gap-3 min-w-0">
            <div className="w-10 h-10 md:w-12 md:h-12 relative rounded-full overflow-hidden border border-gray-50 shrink-0">
              <Image src="/images/avatar.png" alt="Olena Zelenska" fill sizes="48px" className="object-cover" />
            </div>
            <div className="min-w-0">
              <h4 className="font-bold text-gray-900 text-sm md:text-base truncate">Olena Zelenska</h4>
              <p className="text-[12px] md:text-sm text-gray-400 font-medium truncate">Designer</p>
            </div>
          </div>
          <div className="flex flex-col items-end shrink-0">
            <span className="inline-block px-2 md:px-3 py-1 bg-success rounded-full text-[9px] md:text-[10px] font-bold text-white mb-0.5 whitespace-nowrap">
              ✓ 88% match
            </span>
            <p className="text-[9px] md:text-[10px] text-gray-300 font-medium">5 day ago</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TopCandidates;
