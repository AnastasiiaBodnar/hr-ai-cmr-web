'use client'

import React from 'react';

const STATUS_COLORS = {
    'OPEN': 'bg-[#BFFFCD] text-[#10B981]',
    'CLOSED': 'bg-[#FFB2B2] text-[#E11D48]',
    'PAUSED': 'bg-[#FFE3BF] text-[#F59E0B]'
};

const STATUS_LABELS = {
    'OPEN': 'Open',
    'CLOSED': 'Close',
    'PAUSED': 'Pause'
};

const VacancyTable = ({ jobs, onEdit, onDelete, isLoading }) => {
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!jobs || jobs.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400 bg-white rounded-xl shadow-sm border border-gray-100">
                <p className="text-lg font-medium">No vacancies found</p>
                <p className="text-sm">Try adjusting your filters or create a new one.</p>
            </div>
        );
    }

    return (
        <div className="border-x border-b border-gray-100 bg-[#F8FAFC] shadow-[0_0_2px_0_rgba(0,0,0,0.25)]">
            <div className="overflow-x-auto overflow-y-auto px-[10px] max-h-[calc(100vh-280px)]">
                <table className="w-full text-left border-separate border-spacing-y-[1px] min-w-[800px]">
                    <thead>
                        <tr className="bg-white group relative after:content-[''] after:absolute after:inset-0 after:shadow-[0_0_2px_0_rgba(0,0,0,0.25)] after:rounded-t-[8px] after:pointer-events-none">
                            <th className="px-6 h-[38px] text-[16px] font-normal text-[#7D7D7D] first:rounded-tl-[8px] bg-white">Job</th>
                            <th className="px-6 h-[38px] text-[16px] font-normal text-[#7D7D7D] bg-white">Work mode</th>
                            <th className="px-6 h-[38px] text-[16px] font-normal text-[#7D7D7D] bg-white">Level</th>
                            <th className="px-6 h-[38px] text-[16px] font-normal text-[#7D7D7D] bg-white">Salary</th>
                            <th className="px-6 h-[38px] text-[16px] font-normal text-[#7D7D7D] bg-white">Status</th>
                            <th className="px-6 h-[38px] text-[16px] font-normal text-[#7D7D7D] text-right last:rounded-tr-[8px] bg-white">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map((job) => (
                            <tr key={job._id || job.id} className="bg-white hover:bg-gray-50/50 transition-colors group shadow-[0_0_2px_0_rgba(0,0,0,0.25)] gap-40">
                                <td className="px-6 h-[50px]">
                                    <span className="font-semibold text-black block text-[20px]">{job.title || 'Untitled'}</span>
                                </td>
                                <td className="px-6 h-[50px] text-[18px] text-black font-normal">
                                    {job.workMode || '-'}
                                </td>
                                <td className="px-6 h-[50px] text-[18px] text-black font-normal">
                                    {job.experience || '-'}
                                </td>
                                <td className="px-6 h-[50px] text-[18px] text-black font-normal">
                                    {job.salaryRange || '-'}
                                </td>
                                <td className="px-6 h-[50px]">
                                    <span className={`inline-flex items-center justify-center w-[83px] h-[28px] rounded-[6px] text-xs font-medium ${STATUS_COLORS[job.status?.toUpperCase()] || 'bg-gray-100 text-gray-600'}`}>
                                        {STATUS_LABELS[job.status?.toUpperCase()] || job.status || 'unknown'}
                                    </span>
                                </td>
                                <td className="px-6 h-[50px] text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => onEdit(job)}
                                            className="p-2 text-gray-400 cursor-pointer"
                                            title="Edit vacancy"
                                        >
                                            <img src="/images/pen.png" alt="Edit" className="w-4 h-4 object-contain" />
                                        </button>
                                        <button
                                            onClick={() => onDelete(job._id || job.id)}
                                            className="p-2 text-gray-400 cursor-pointer"
                                            title="Delete vacancy"
                                        >
                                            <img src="/images/delete.png" alt="Delete" className="w-4 h-4 object-contain" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VacancyTable;
