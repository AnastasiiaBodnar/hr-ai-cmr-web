'use client'

import React, { useState } from 'react';
import Image from 'next/image';


const PERIODS = [
  'Last 1 year',
  'Last 9 months',
  'Last 6 months',
  'Last 3 months',
  'Last month',
  'Last 1 week',
  'Last day'
];

const KpiCard = ({ title, value, change, changeText, icon }) => {
  const isPositive = change.startsWith('+');

  return (
    <div className="bg-white rounded-[10px] p-4 shadow-[0_0_2px_rgba(0,0,0,0.25)] flex-1 min-w-[240px] flex items-center justify-between min-h-[90px]">
      <div className="flex flex-col gap-2">

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 relative shrink-0">
            <Image src={icon} alt={title} fill sizes="35px" className="object-contain" />
          </div>
          <h3 className="text-gray-500 font-medium text-sm">{title}</h3>
        </div>

        <div className="flex items-center gap-1.5">
          <span className={`text-sm font-bold ${isPositive ? 'text-success' : 'text-error'}`}>
            {change}
          </span>
          <span className="text-base text-gray-400 font-medium">{changeText}</span>
        </div>
      </div>

      <div className="text-4xl font-bold text-gray-900 pr-2">
        {value}
      </div>
    </div>
  );
};

const PeriodDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('Last month');

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-5 h-10 bg-gray-50 border rounded-[10px] text-sm font-medium flex items-center gap-4 transition-all ${isOpen ? 'border-primary text-primary shadow-[0_0_0_1px_#0B8B95]' : 'border-gray-100 text-gray-600'
          }`}
      >
        {selectedPeriod}
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180 text-primary' : 'text-gray-400'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
      )}

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
          {PERIODS.map((period) => (
            <button
              key={period}
              onClick={() => {
                setSelectedPeriod(period);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${selectedPeriod === period
                ? 'bg-primary/10 text-primary font-bold'
                : 'text-gray-400 hover:bg-gray-50'
                }`}
            >
              {period}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

{/* Main */ }

const Overview = ({ onCreateVacancy }) => {
  return (
    <div className="space-y-4 mb-2">

      <div className="bg-white rounded-[10px] h-[68px] shadow-[0_0_2px_rgba(0,0,0,0.25)] flex items-center justify-between px-6">
        <h2 className="text-xl font-bold text-gray-900">Overview</h2>

        <div className="flex items-center gap-4">
          <PeriodDropdown />

          <button
            onClick={onCreateVacancy}
            className="px-6 h-10 bg-primary text-white rounded-[10px] text-sm font-bold hover:opacity-90 transition-opacity flex items-center"
          >
            Create vacancy +
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <KpiCard
          title="Open jobs"
          value="19"
          change="+5.1%"
          changeText="from 15 last month"
          icon="/images/OpenJobs.png"
        />
        <KpiCard
          title="New candidates"
          value="284"
          change="+15%"
          changeText="from 6 last month"
          icon="/images/NewCandidates.png"
        />
        <KpiCard
          title="Interview/Test"
          value="68"
          change="+3%"
          changeText="from 14 last month"
          icon="/images/Interview.png"
        />
        <KpiCard
          title="Total hired"
          value="17"
          change="+2.6%"
          changeText="from 6 last month"
          icon="/images/Hired.png"
        />
      </div>

    </div>
  );
};

export default Overview;
