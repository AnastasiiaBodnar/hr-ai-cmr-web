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

        <div className="flex items-start justify-between group">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 relative rounded-full overflow-hidden border border-gray-50">
              <Image src="/images/avatar.png" alt="Olga Holodenina" fill sizes="48px" className="object-cover" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-base">Olga Holodenina</h4>
              <p className="text-sm text-gray-400 font-medium">Frontend Developer</p>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-block px-3 py-1 bg-success rounded-full text-[10px] font-bold text-white mb-1">
              ✓ 95% match
            </span>
            <p className="text-[10px] text-gray-300 font-medium">3 day ago</p>
          </div>
        </div>

        <div className="flex items-start justify-between group">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 relative rounded-full overflow-hidden border border-gray-50">
              <Image src="/images/avatar.png" alt="Andriy Shevchenko" fill sizes="48px" className="object-cover" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-base">Andriy Shevchenko</h4>
              <p className="text-sm text-gray-400 font-medium">PM</p>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-block px-3 py-1 bg-success rounded-full text-[10px] font-bold text-white mb-1">
              ✓ 92% match
            </span>
            <p className="text-[10px] text-gray-300 font-medium">1 day ago</p>
          </div>
        </div>

        <div className="flex items-start justify-between group">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 relative rounded-full overflow-hidden border border-gray-50">
              <Image src="/images/avatar.png" alt="Olena Zelenska" fill sizes="48px" className="object-cover" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-base">Olena Zelenska</h4>
              <p className="text-sm text-gray-400 font-medium">Designer</p>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-block px-3 py-1 bg-success rounded-full text-[10px] font-bold text-white mb-1">
              ✓ 88% match
            </span>
            <p className="text-[10px] text-gray-300 font-medium">5 day ago</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TopCandidates;
