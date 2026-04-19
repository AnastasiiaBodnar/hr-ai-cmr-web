'use client'

import React, { useState } from 'react';
import MainLayout from '@/app/components/layout/MainLayout';
import Overview from '@/app/components/dashboard/Overview';
import JobsOverviewTable from '@/app/components/dashboard/JobsOverviewTable';
import TopCandidates from '@/app/components/dashboard/TopCandidates';
import CandidateStatusChart from '@/app/components/dashboard/CandidateStatusChart';
import CreateVacancyModal from '@/app/components/dashboard/CreateVacancyModal';

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <MainLayout>
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-[21px]">Dashboard</h1>
          <Overview onCreateVacancy={() => setIsModalOpen(true)} />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 min-h-[500px]">
          <div className="xl:col-span-2">
            <JobsOverviewTable />
          </div>
          <div>
            <TopCandidates />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-4">
          <div className="xl:col-span-2">
            <CandidateStatusChart />
          </div>
          <div className="hidden xl:block">
          </div>
        </div>
      </div>

      {isModalOpen && (
        <CreateVacancyModal onClose={() => setIsModalOpen(false)} />
      )}
    </MainLayout>
  );
}
