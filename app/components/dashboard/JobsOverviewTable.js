'use client'

import React from 'react';

const JOBS_DATA = [
  { id: 1, name: 'Frontend developer', candidates: 22, interview: 7, offer: 4, hired: 3 },
  { id: 2, name: 'Backend developer', candidates: 16, interview: 4, offer: 2, hired: 1 },
  { id: 3, name: 'UI/UX Designer', candidates: 32, interview: 11, offer: 8, hired: 3 },
  { id: 4, name: 'QA Engineer', candidates: 14, interview: 9, offer: 5, hired: 2 },
  { id: 5, name: 'Mobile developer', candidates: 11, interview: 3, offer: 2, hired: 2 },
  { id: 6, name: 'Project Manager', candidates: 36, interview: 14, offer: 6, hired: 1 },
];

const JobsOverviewTable = () => {
  return (
    <div className="bg-white rounded-[10px] shadow-[0_0_2px_rgba(0,0,0,0.25)] overflow-hidden h-full flex flex-col">

      <div className="p-6 border-b-[0.8px] border-[#DCDCDC] flex items-center h-[60px]">
        <h3 className="text-xl font-bold text-gray-900">Jobs overview</h3>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">

          <thead>
            <tr className="border-b-[0.8px] border-[#DCDCDC]">
              <th className="px-6 py-4 text-lg font-medium text-gray-400">Jobs</th>
              <th className="px-6 py-4 text-lg font-medium text-gray-400 text-center">Candidates</th>
              <th className="px-6 py-4 text-lg font-medium text-gray-400 text-center">Interview/Test</th>
              <th className="px-6 py-4 text-lg font-medium text-gray-400 text-center">Offer</th>
              <th className="px-6 py-4 text-lg font-medium text-gray-400 text-center">Hired</th>
            </tr>
          </thead>

          <tbody>
            {JOBS_DATA.map((job) => (
              <tr key={job.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-5 text-base font-bold text-gray-900">{job.name}</td>
                <td className="px-6 py-5 text-base font-medium text-gray-600 text-center">{job.candidates}</td>
                <td className="px-6 py-5 text-base font-medium text-gray-600 text-center border-l-[0.8px] border-[#DCDCDC]">{job.interview}</td>
                <td className="px-6 py-5 text-base font-medium text-gray-600 text-center border-l-[0.8px] border-[#DCDCDC]">{job.offer}</td>
                <td className="px-6 py-5 text-base font-medium text-gray-600 text-center border-l-[0.8px] border-[#DCDCDC]">{job.hired}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default JobsOverviewTable;
