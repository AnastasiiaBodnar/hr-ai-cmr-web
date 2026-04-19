'use client'

import React from 'react';

const JobsOverviewTable = () => {
  return (
    <div className="bg-white rounded-[10px] shadow-[0_0_2px_rgba(0,0,0,0.25)] overflow-hidden h-full flex flex-col">

      <div className="p-6 border-b border-gray-100 flex items-center h-[60px]">
        <h3 className="text-xl font-bold text-gray-900">Jobs overview</h3>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">

          <thead>
            <tr className="border-b border-gray-100">
              <th className="px-6 py-4 text-lg font-medium text-gray-400">Jobs</th>
              <th className="px-6 py-4 text-lg font-medium text-gray-400 text-center">Candidates</th>
              <th className="px-6 py-4 text-lg font-medium text-gray-400 text-center">Interview/Test</th>
              <th className="px-6 py-4 text-lg font-medium text-gray-400 text-center">Offer</th>
              <th className="px-6 py-4 text-lg font-medium text-gray-400 text-center">Hired</th>
            </tr>
          </thead>

          <tbody>

            {/* Frontend developer */}
            <tr className="hover:bg-gray-50/50 transition-colors">
              <td className="px-6 py-5 text-base font-bold text-gray-900">Frontend developer</td>
              <td className="px-6 py-5 text-base font-medium text-gray-600 text-center">22</td>
              <td className="px-6 py-5 text-base font-medium text-gray-600 text-center border-l border-gray-100">7</td>
              <td className="px-6 py-5 text-base font-medium text-gray-600 text-center border-l border-gray-100">4</td>
              <td className="px-6 py-5 text-base font-medium text-gray-600 text-center border-l border-gray-100">3</td>
            </tr>

            {/* Backend developer */}
            <tr className="hover:bg-gray-50/50 transition-colors">
              <td className="px-6 py-5 text-base font-bold text-gray-900">Backend developer</td>
              <td className="px-6 py-5 text-base font-medium text-gray-600 text-center">16</td>
              <td className="px-6 py-5 text-base font-medium text-gray-600 text-center border-l border-gray-100">4</td>
              <td className="px-6 py-5 text-base font-medium text-gray-600 text-center border-l border-gray-100">2</td>
              <td className="px-6 py-5 text-base font-medium text-gray-600 text-center border-l border-gray-100">1</td>
            </tr>

            {/* UI/UX Designer */}
            <tr className="hover:bg-gray-50/50 transition-colors">
              <td className="px-6 py-5 text-base font-bold text-gray-900">UI/UX Designer</td>
              <td className="px-6 py-5 text-base font-medium text-gray-600 text-center">32</td>
              <td className="px-6 py-5 text-base font-medium text-gray-600 text-center border-l border-gray-100">11</td>
              <td className="px-6 py-5 text-base font-medium text-gray-600 text-center border-l border-gray-100">8</td>
              <td className="px-6 py-5 text-base font-medium text-gray-600 text-center border-l border-gray-100">3</td>
            </tr>

            {/* QA Engineer */}
            <tr className="hover:bg-gray-50/50 transition-colors">
              <td className="px-6 py-5 text-base font-bold text-gray-900">QA Engineer</td>
              <td className="px-6 py-5 text-base font-medium text-gray-600 text-center">14</td>
              <td className="px-6 py-5 text-base font-medium text-gray-600 text-center border-l border-gray-100">9</td>
              <td className="px-6 py-5 text-base font-medium text-gray-600 text-center border-l border-gray-100">5</td>
              <td className="px-6 py-5 text-base font-medium text-gray-600 text-center border-l border-gray-100">2</td>
            </tr>

            {/* Mobile developer */}
            <tr className="hover:bg-gray-50/50 transition-colors">
              <td className="px-6 py-5 text-base font-bold text-gray-900">Mobile developer</td>
              <td className="px-6 py-5 text-base font-medium text-gray-600 text-center">11</td>
              <td className="px-6 py-5 text-base font-medium text-gray-600 text-center border-l border-gray-100">3</td>
              <td className="px-6 py-5 text-base font-medium text-gray-600 text-center border-l border-gray-100">2</td>
              <td className="px-6 py-5 text-base font-medium text-gray-600 text-center border-l border-gray-100">2</td>
            </tr>

            {/* Project Manager */}
            <tr className="hover:bg-gray-50/50 transition-colors">
              <td className="px-6 py-5 text-base font-bold text-gray-900">Project Manager</td>
              <td className="px-6 py-5 text-base font-medium text-gray-600 text-center">36</td>
              <td className="px-6 py-5 text-base font-medium text-gray-600 text-center border-l border-gray-100">14</td>
              <td className="px-6 py-5 text-base font-medium text-gray-600 text-center border-l border-gray-100">6</td>
              <td className="px-6 py-5 text-base font-medium text-gray-600 text-center border-l border-gray-100">1</td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobsOverviewTable;
