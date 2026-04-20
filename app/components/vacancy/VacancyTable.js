'use client'

import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

const STATUS_COLORS = {
    'OPEN': 'bg-green-100 text-green-700',
    'CLOSED': 'bg-red-100 text-red-700',
    'PAUSE': 'bg-orange-100 text-orange-700'
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
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100">
                            <th className="px-6 py-4 text-sm font-semibold text-gray-500">Job</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-500">Work mode</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-500">Level</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-500">Salary</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-500">Status</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-500 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {jobs.map((job) => (
                            <tr key={job._id || job.id} className="hover:bg-gray-50/30 transition-colors group">
                                <td className="px-6 py-4">
                                    <span className="font-bold text-gray-900 block">{job.title || 'Untitled'}</span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    {job.workMode || 'N/A'}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    {job.experience || 'N/A'}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    {job.salaryRange || 'N/A'}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-[12px] font-bold uppercase tracking-wider ${STATUS_COLORS[job.status?.toUpperCase()] || 'bg-gray-100 text-gray-600'}`}>
                                        {job.status?.toLowerCase() || 'unknown'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button 
                                            onClick={() => onEdit(job)}
                                            className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                                            title="Edit vacancy"
                                        >
                                            <Pencil size={18} />
                                        </button>
                                        <button 
                                            onClick={() => onDelete(job._id || job.id)}
                                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                            title="Delete vacancy"
                                        >
                                            <Trash2 size={18} />
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
