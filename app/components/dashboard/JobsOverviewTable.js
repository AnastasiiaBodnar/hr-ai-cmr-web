'use client'

import React, { useState, useEffect } from 'react';
import { getJobs } from '@/lib/jobs';

const JobsOverviewTable = () => {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setIsLoading(true);
                const data = await getJobs();
                setJobs(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error('Failed to fetch vacancies:', err);
                setError('Failed to load vacancies. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchJobs();
    }, []);

    if (isLoading) {
        return (
            <div className="bg-white rounded-[10px] shadow-[0_0_2px_rgba(0,0,0,0.25)] h-full flex items-center justify-center min-h-[300px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-[10px] shadow-[0_0_2px_rgba(0,0,0,0.25)] overflow-hidden h-full flex flex-col">
            <div className="p-6 border-b-[0.8px] border-[#DCDCDC] flex items-center h-[60px]">
                <h3 className="text-xl font-bold text-gray-900">Jobs overview</h3>
            </div>

            <div className="flex-1 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200">
                {error ? (
                    <div className="p-8 text-center text-red-500">{error}</div>
                ) : (
                    <table className="w-full min-w-[600px] text-left border-collapse">
                        <thead>
                            <tr className="border-b-[0.8px] border-[#DCDCDC]">
                                <th className="px-4 md:px-6 py-4 text-base md:text-lg font-medium text-gray-400">Jobs</th>
                                <th className="px-4 md:px-6 py-4 text-base md:text-lg font-medium text-gray-400 text-center">Candidates</th>
                                <th className="px-4 md:px-6 py-4 text-base md:text-lg font-medium text-gray-400 text-center">Interview/Test</th>
                                <th className="px-4 md:px-6 py-4 text-base md:text-lg font-medium text-gray-400 text-center">Offer</th>
                                <th className="px-4 md:px-6 py-4 text-base md:text-lg font-medium text-gray-400 text-center">Hired</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map((job) => (
                                <tr key={job.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-4 md:px-6 py-4 md:py-5 text-sm md:text-base font-bold text-gray-900">
                                        {job.title || job.name || 'Untitled Job'}
                                    </td>
                                    <td className="px-4 md:px-6 py-4 md:py-5 text-sm md:text-base font-medium text-gray-600 text-center">
                                        {job.candidatesCount || 0}
                                    </td>
                                    <td className="px-4 md:px-6 py-4 md:py-5 text-sm md:text-base font-medium text-gray-600 text-center border-l-[0.8px] border-[#DCDCDC]">
                                        {job.interviewsCount || 0}
                                    </td>
                                    <td className="px-4 md:px-6 py-4 md:py-5 text-sm md:text-base font-medium text-gray-600 text-center border-l-[0.8px] border-[#DCDCDC]">
                                        {job.offersCount || 0}
                                    </td>
                                    <td className="px-4 md:px-6 py-4 md:py-5 text-sm md:text-base font-medium text-gray-600 text-center border-l-[0.8px] border-[#DCDCDC]">
                                        {job.hiredCount || 0}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default JobsOverviewTable;
