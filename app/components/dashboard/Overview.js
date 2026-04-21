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

const KPI_DATA = [
  {
    id: 'open-jobs',
    title: 'Open jobs',
    value: '19',
    change: '+5.1%',
    changeText: 'from 15 last month',
    icon: '/images/OpenJobs.png'
  },
  {
    id: 'new-candidates',
    title: 'New candidates',
    value: '284',
    change: '+15%',
    changeText: 'from 6 last month',
    icon: '/images/NewCandidates.png'
  },
  {
    id: 'interview',
    title: 'Interview/Test',
    value: '68',
    change: '+3%',
    changeText: 'from 14 last month',
    icon: '/images/Interview.png'
  },
  {
    id: 'hired',
    title: 'Total hired',
    value: '17',
    change: '+2.6%',
    changeText: 'from 6 last month',
    icon: '/images/Hired.png'
  }
];

const KpiCard = ({ title, value, change, changeText, icon }) => {
  const isPositive = change.startsWith('+');

  return (
    <div className="bg-white rounded-[10px] p-4 shadow-[0_0_2px_rgba(0,0,0,0.25)] flex-1 flex items-center justify-between min-h-[90px] gap-2">
      <div className="flex flex-col gap-1.5 min-w-0">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-6 h-6 md:w-8 md:h-8 relative shrink-0">
            <Image src={icon} alt={title} fill sizes="35px" className="object-contain" />
          </div>
          <h3 className="text-black font-bold text-base md:text-lg truncate">{title}</h3>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className={`text-[12px] md:text-sm font-bold ${isPositive ? 'text-success' : 'text-error'}`}>
            {change}
          </span>
          <span className="text-[12px] md:text-base text-gray-400 font-medium whitespace-nowrap">{changeText}</span>
        </div>
      </div>

      <div className="text-3xl md:text-4xl font-bold text-gray-900 shrink-0">
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
        className={`px-5 h-10 bg-[#F8FAFC] border rounded-[10px] text-[14px] font-normal font-roboto flex items-center justify-between gap-4 transition-all ${isOpen ? 'border-primary text-primary' : 'border-[#B0B0B0] text-[#898989]'
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

      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
          {PERIODS.map((period) => (
            <button
              key={period}
              onClick={() => {
                setSelectedPeriod(period);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 text-[14px] font-normal font-roboto transition-colors h-[28px] flex items-center ${selectedPeriod === period
                ? 'bg-[#0022932E] text-primary'
                : 'text-[#898989] hover:bg-gray-50'
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


const Overview = ({ onCreateVacancy }) => {
  return (
    <div className="space-y-4 mb-2">

      <div className="bg-white rounded-[10px] min-h-[68px] h-auto py-4 md:py-0 shadow-[0_0_2px_rgba(0,0,0,0.25)] flex flex-col sm:flex-row items-center justify-between px-6 gap-4">
        <h2 className="text-xl font-bold text-gray-900 self-start sm:self-auto">Overview</h2>

        <div className="flex flex-col min-[500px]:flex-row items-stretch min-[500px]:items-center gap-3 w-full sm:w-auto">

          <button
            onClick={onCreateVacancy}
            className="px-4 md:px-6 h-10 bg-primary text-white rounded-[10px] text-xs md:text-sm font-bold hover:opacity-90 transition-opacity flex items-center justify-center whitespace-nowrap"
          >
            Create vacancy +
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {KPI_DATA.map((kpi) => (
          <KpiCard
            key={kpi.id}
            title={kpi.title}
            value={kpi.value}
            change={kpi.change}
            changeText={kpi.changeText}
            icon={kpi.icon}
          />
        ))}
      </div>

    </div>
  );
};

export default Overview;
