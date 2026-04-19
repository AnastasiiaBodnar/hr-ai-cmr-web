'use client'

import React, { useState } from 'react';
import MainLayout from '@/app/components/layout/MainLayout';
import Overview from '@/app/components/dashboard/Overview';
import JobsOverviewTable from '@/app/components/dashboard/JobsOverviewTable';
import CandidatesFunnel from '@/app/components/dashboard/CandidatesFunnel';
import TopCandidates from '@/app/components/dashboard/TopCandidates';
import CandidateStatusChart from '@/app/components/dashboard/CandidateStatusChart';
import CreateVacancyModal from '@/app/components/dashboard/CreateVacancyModal';

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleVacancyCreated = () => {
    setRefreshKey(prev => prev + 1);
    setIsModalOpen(false);
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-4 max-w-[1600px]">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-[21px]">Dashboard</h1>
          <Overview onCreateVacancy={() => setIsModalOpen(true)} />
        </div>

        {/* Middle Row: Funnel and Top Candidates */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2 h-[420px]">
            <CandidatesFunnel />
          </div>
          <div className="h-[420px]">
            <TopCandidates />
          </div>
        </div>

        {/* Bottom Row: Status Chart and Jobs Overview */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-4">
          <div className="h-[360px]">
            <CandidateStatusChart />
          </div>
          <div className="h-[360px]">
            <JobsOverviewTable key={refreshKey} />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <CreateVacancyModal 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={handleVacancyCreated}
        />
      )}
    </MainLayout>
  );
}
