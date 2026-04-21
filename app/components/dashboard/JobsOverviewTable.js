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
            <div className="px-[32px] border-b-[0.8px] border-[#DCDCDC] flex items-center h-[64px]">
                <h3 className="text-xl font-bold text-gray-900 font-roboto">Jobs overview</h3>
            </div>

            <div className="flex-1 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200">
                {error ? (
                    <div className="p-8 text-center text-red-500">{error}</div>
                ) : (
                    <table className="w-full min-w-[600px] text-left border-collapse">
                        <thead>
                            <tr className="border-b-[0.8px] border-[#DCDCDC]">
                                <th className="pl-[32px] pr-6 py-4 text-[20px] font-normal text-[#757575] font-roboto">Jobs</th>
                                <th className="px-6 py-4 text-[20px] font-normal text-[#757575] text-center font-roboto">Candidates</th>
                                <th className="px-6 py-4 text-[20px] font-normal text-[#757575] text-center font-roboto">Interview/Test</th>
                                <th className="px-6 py-4 text-[20px] font-normal text-[#757575] text-center font-roboto">Offer</th>
                                <th className="px-6 py-4 text-[20px] font-normal text-[#757575] text-center font-roboto">Hired</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map((job) => (
                                    <tr key={job.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="pl-[32px] pr-6 py-5 text-[20px] font-normal text-black font-roboto">
                                            {job.title || job.name || 'Untitled Job'}
                                        </td>
                                        <td className="px-6 py-5 text-[20px] font-normal text-black text-center font-roboto">
                                            {job.candidatesCount || 0}
                                        </td>
                                        <td className="px-6 py-5 text-[20px] font-normal text-black text-center font-roboto border-l-[0.8px] border-[#DCDCDC]">
                                            {job.interviewsCount || 0}
                                        </td>
                                        <td className="px-6 py-5 text-[20px] font-normal text-black text-center border-l-[0.8px] border-[#DCDCDC] font-roboto">
                                            {job.offersCount || 0}
                                        </td>
                                        <td className="px-6 py-5 text-[20px] font-normal text-black text-center border-l-[0.8px] border-[#DCDCDC] font-roboto">
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
