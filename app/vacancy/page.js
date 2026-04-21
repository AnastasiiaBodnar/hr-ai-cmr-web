'use client'

import React, { useState, useEffect, useMemo } from 'react';
import MainLayout from '@/app/components/layout/MainLayout';
import VacancySelect from '@/app/components/ui/VacancySelect';
import VacancyButton from '@/app/components/ui/VacancyButton';
import VacancyTable from '@/app/components/vacancy/VacancyTable';
import CreateVacancyModal from '@/app/components/dashboard/CreateVacancyModal';
import DeleteVacancyModal from '@/app/components/vacancy/DeleteVacancyModal';
import { getJobs, deleteJob } from '@/lib/jobs';
import { Plus } from 'lucide-react';

const PERIOD_OPTIONS = [
    { value: 'all', label: 'All time' },
    { value: 'last-month', label: 'Last month' },
    { value: 'last-week', label: 'Last week' },
];

const WORK_MODE_OPTIONS = [
    { value: 'all', label: 'All modes' },
    { value: 'Full-time', label: 'Full-time' },
    { value: 'Part-time', label: 'Part-time' },
    { value: 'Remote', label: 'Remote' },
    { value: 'Hybrid', label: 'Hybrid' },
];

const STATUS_OPTIONS = [
    { value: 'all', label: 'All status' },
    { value: 'OPEN', label: 'Open' },
    { value: 'CLOSED', label: 'Closed' },
    { value: 'PAUSED', label: 'Pause' },
];

export default function VacancyPage() {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        period: 'last-month',
        workMode: 'all',
        status: 'all'
    });

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingVacancy, setEditingVacancy] = useState(null);
    const [deletingVacancyId, setDeletingVacancyId] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const fetchJobs = async () => {
        setIsLoading(true);
        try {
            const data = await getJobs();
            setJobs(data || []);
        } catch (error) {
            console.error('Failed to fetch jobs:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();

        const mainElement = document.querySelector('main');
        if (mainElement) {
            mainElement.style.overflow = 'hidden';
        }

        return () => {
            if (mainElement) {
                mainElement.style.overflow = '';
            }
        };
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleDelete = async () => {
        if (!deletingVacancyId) return;
        setIsDeleting(true);
        try {
            await deleteJob(deletingVacancyId);
            setJobs(prev => prev.filter(job => (job._id || job.id) !== deletingVacancyId));
            setDeletingVacancyId(null);
        } catch (error) {
            console.error('Failed to delete job:', error);
            alert('Failed to delete vacancy. Please try again.');
        } finally {
            setIsDeleting(false);
        }
    };

    const filteredJobs = useMemo(() => {
        return jobs.filter(job => {
            const matchesSearch = (job.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                (job.department || '').toLowerCase().includes(searchQuery.toLowerCase());

            const matchesWorkMode = filters.workMode === 'all' || job.workMode === filters.workMode;
            const matchesStatus = filters.status === 'all' ||
                (filters.status === 'PAUSED' ? (job.status?.toUpperCase() === 'PAUSE' || job.status?.toUpperCase() === 'PAUSED') : job.status?.toUpperCase() === filters.status.toUpperCase());

            return matchesSearch && matchesWorkMode && matchesStatus;
        });
    }, [jobs, searchQuery, filters]);

    return (
        <MainLayout searchQuery={searchQuery} setSearchQuery={setSearchQuery}>
            <div className="flex flex-col gap-4 max-w-[1600px] mx-auto px-4 md:px-0">
                <div className="px-1 min-[400px]:px-0">
                    <h1 className="text-2xl md:text-4xl font-bold text-gray-900 ">Vacancies</h1>
                </div>

                <div className="flex flex-col">
                    {/* Filters Section */}
                    <div className="bg-white px-6 h-[68px] rounded-t-[10px] border-x border-t border-gray-100 flex items-center justify-between shadow-sm">
                        <div className="flex gap-3">
                            <VacancySelect
                                name="workMode"
                                value={filters.workMode}
                                onChange={handleFilterChange}
                                options={WORK_MODE_OPTIONS}
                            />
                            <VacancySelect
                                name="status"
                                value={filters.status}
                                onChange={handleFilterChange}
                                options={STATUS_OPTIONS}
                            />
                        </div>
                        <VacancyButton
                            onClick={() => {
                                setEditingVacancy(null);
                                setIsCreateModalOpen(true);
                            }}
                        >
                            Create vacancy +
                        </VacancyButton>
                    </div>

                    {/* Stats Summary Strip */}
                    <div className="bg-[#F8FAFC] h-[35px] px-6 flex items-center border-x border-gray-100 shadow-[0_0_2px_0_rgba(0,0,0,0.25)] relative z-10">
                        <div className="text-[14px] text-[#7E7E7E] font-normal">
                            Total jobs: <span className="text-[#7E7E7E]">{filteredJobs.length}</span>
                        </div>
                    </div>

                    {/* Table Section */}
                    <VacancyTable
                        jobs={filteredJobs}
                        isLoading={isLoading}
                        onEdit={(job) => {
                            setEditingVacancy(job);
                            setIsCreateModalOpen(true);
                        }}
                        onDelete={(id) => setDeletingVacancyId(id)}
                    />
                </div>
            </div>

            {/* Modals */}
            {isCreateModalOpen && (
                <CreateVacancyModal
                    isEditing={!!editingVacancy}
                    vacancyId={editingVacancy?._id || editingVacancy?.id}
                    initialData={editingVacancy}
                    onClose={() => {
                        setIsCreateModalOpen(false);
                        setEditingVacancy(null);
                    }}
                    onSuccess={fetchJobs}
                />
            )}

            {deletingVacancyId && (
                <DeleteVacancyModal
                    isLoading={isDeleting}
                    onClose={() => setDeletingVacancyId(null)}
                    onConfirm={handleDelete}
                />
            )}
        </MainLayout>
    );
}
