'use client'

import React, { useState, useEffect, useMemo } from 'react';
import MainLayout from '@/app/components/layout/MainLayout';
import Select from '@/app/components/ui/Select';
import Input from '@/app/components/ui/Input';
import VacancyTable from '@/app/components/vacancy/VacancyTable';
import CreateVacancyModal from '@/app/components/dashboard/CreateVacancyModal';
import DeleteVacancyModal from '@/app/components/vacancy/DeleteVacancyModal';
import { getJobs, deleteJob } from '@/lib/jobs';
import { Search, Plus } from 'lucide-react';

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
    { value: 'PAUSE', label: 'Pause' },
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
            const matchesStatus = filters.status === 'all' || job.status?.toUpperCase() === filters.status.toUpperCase();

            return matchesSearch && matchesWorkMode && matchesStatus;
        });
    }, [jobs, searchQuery, filters]);

    return (
        <MainLayout searchQuery={searchQuery} setSearchQuery={setSearchQuery}>
            <div className="max-w-[1600px] mx-auto px-4 md:px-0 flex flex-col gap-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h1 className="text-3xl font-bold text-gray-900">Vacancies</h1>

                    <button
                        onClick={() => {
                            setEditingVacancy(null);
                            setIsCreateModalOpen(true);
                        }}
                        className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20"
                    >
                        <Plus size={20} />
                        Create vacancy +
                    </button>
                </div>

                {/* Filters Section */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col lg:flex-row items-center justify-end gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto min-w-[500px]">
                        <Select
                            name="period"
                            value={filters.period}
                            onChange={handleFilterChange}
                            options={PERIOD_OPTIONS}
                        />
                        <Select
                            name="workMode"
                            value={filters.workMode}
                            onChange={handleFilterChange}
                            options={WORK_MODE_OPTIONS}
                        />
                        <Select
                            name="status"
                            value={filters.status}
                            onChange={handleFilterChange}
                            options={STATUS_OPTIONS}
                        />
                    </div>
                </div>

                {/* Stats Summary */}
                <div className="text-sm text-gray-500 font-medium">
                    Total jobs: <span className="text-primary">{filteredJobs.length}</span>
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
