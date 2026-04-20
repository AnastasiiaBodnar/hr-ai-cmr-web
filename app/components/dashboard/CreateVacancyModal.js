import { useState, useRef, useEffect } from 'react'
import Input from '@/app/components/ui/Input'
import Select from '@/app/components/ui/Select'
import Image from 'next/image'
import { X, Plus } from 'lucide-react'
import { createJob, updateJob } from '@/lib/jobs'

export default function CreateVacancyModal({ isEditing = false, vacancyId = null, initialData = null, onClose, onSuccess }) {
    const [formData, setFormData] = useState({
        jobTitle: initialData?.title || '',
        department: initialData?.department || '',
        location: initialData?.location || '',
        workMode: initialData?.workMode || 'Full-time',
        experienceLevel: initialData?.experience || 'Middle',
        status: initialData?.status || 'OPEN',
        salaryRange: initialData?.salaryRange || '',
        description: initialData?.description || '',
    })

    const [skills, setSkills] = useState(initialData?.techStack || [])
    const [newSkill, setNewSkill] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [fieldErrors, setFieldErrors] = useState({})
    const [successMessage, setSuccessMessage] = useState(null)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        setFieldErrors((prev) => ({ ...prev, [name]: null }))
    }

    const handleAddSkill = (e) => {
        if (e) e.preventDefault();
        if (newSkill.trim() && !skills.includes(newSkill.trim())) {
            setSkills([...skills, newSkill.trim()])
            setNewSkill('')
        }
    }

    const removeSkill = (skillToRemove) => {
        setSkills(skills.filter(skill => skill !== skillToRemove))
    }

    const validate = () => {
        const errors = {}
        if (!formData.jobTitle || !formData.jobTitle.trim()) errors.jobTitle = 'Job title is required'
        if (!formData.department || !formData.department.trim()) errors.department = 'Department is required'
        if (!formData.description || !formData.description.trim()) errors.description = 'Description is required'
        return errors
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)

        const errors = validate()
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors)
            return
        }

        setIsLoading(true)
        try {
            const payload = {
                title: formData.jobTitle,
                department: formData.department,
                description: formData.description,
                salaryRange: formData.salaryRange,
                workMode: formData.workMode,
                experience: formData.experienceLevel,
                location: formData.location,
                status: formData.status.toUpperCase(),
                techStack: skills
            }

            if (isEditing && vacancyId) {
                await updateJob(vacancyId, payload)
                setSuccessMessage('Vacancy successfully updated!')
            } else {
                await createJob(payload)
                setSuccessMessage('Vacancy successfully created!')
            }

            setTimeout(() => {
                setSuccessMessage(null)
                if (onSuccess) onSuccess();
                onClose()
            }, 1500)

        } catch (err) {
            console.error('Submit error:', err)
            setError(err.message || 'Failed to save vacancy. Please check your data.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-4 md:p-8 overflow-y-auto max-h-[95vh] animate-in fade-in zoom-in-95 duration-200 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                <div className="absolute -top-16 right-0 w-44 h-44 bg-purple-600/40 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute top-48 -left-36 w-64 h-64 bg-teal-600/30 rounded-full blur-3xl pointer-events-none"></div>

                <form className="relative z-10" onSubmit={handleSubmit}>
                    <div className="flex items-center space-x-3 mb-3">
                        <div className="relative w-12 h-8 shrink-0">
                            <Image src="/images/logo.png" alt="HR Logo" fill sizes="48px" className="object-contain" />
                        </div>
                        <h2 className="text-xl font-bold text-black">
                            {isEditing ? 'Edit job vacancy' : 'Create job vacancy'}
                        </h2>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg relative z-20 font-medium">
                            {error}
                        </div>
                    )}

                    {successMessage && (
                        <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg relative z-20 flex items-center space-x-2 font-medium">
                            <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{successMessage}</span>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3 relative z-40">
                        <div>
                            <label className="block text-base font-semibold text-gray-500 mb-1.5">
                                Job title<span className="text-red-500">*</span>
                            </label>
                            <Input name="jobTitle" value={formData.jobTitle} onChange={handleChange} required error={!!fieldErrors.jobTitle} className="!py-2 text-sm" />
                            {fieldErrors.jobTitle && <p className="text-red-500 text-xs mt-1 font-medium">{fieldErrors.jobTitle}</p>}
                        </div>

                        <div>
                            <label className="block text-base font-semibold text-gray-500 mb-1.5">
                                Department<span className="text-red-500">*</span>
                            </label>
                            <Input name="department" value={formData.department} onChange={handleChange} required error={!!fieldErrors.department} className="!py-2 text-sm" />
                            {fieldErrors.department && <p className="text-red-500 text-xs mt-1 font-medium">{fieldErrors.department}</p>}
                        </div>

                        <div>
                            <label className="block text-base font-semibold text-gray-500 mb-1.5">
                                Location / Region
                            </label>
                            <Input name="location" value={formData.location} onChange={handleChange} className="!py-2 text-sm" />
                        </div>

                        <div>
                            <label className="block text-base font-semibold text-gray-500 mb-1.5">
                                Salary range
                            </label>
                            <Input name="salaryRange" value={formData.salaryRange} onChange={handleChange} className="!py-2 text-sm" placeholder="e.g. $2000 - $4000" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 relative z-30">
                        <div>
                            <label className="block text-base font-semibold text-gray-500 mb-1.5">
                                Work mode
                            </label>
                            <Select
                                name="workMode"
                                value={formData.workMode}
                                onChange={handleChange}
                                options={[
                                    { value: 'Full-time', label: 'Full-time' },
                                    { value: 'Part-time', label: 'Part-time' },
                                    { value: 'Remote', label: 'Remote' },
                                    { value: 'Hybrid', label: 'Hybrid' },
                                ]}
                            />
                        </div>

                        <div>
                            <label className="block text-base font-semibold text-gray-500 mb-1.5">
                                Experience
                            </label>
                            <Select
                                name="experienceLevel"
                                value={formData.experienceLevel}
                                onChange={handleChange}
                                options={[
                                    { value: 'Trainee', label: 'Trainee' },
                                    { value: 'Junior', label: 'Junior' },
                                    { value: 'Middle', label: 'Middle' },
                                    { value: 'Senior', label: 'Senior' },
                                ]}
                            />
                        </div>

                        <div>
                            <label className="block text-base font-semibold text-gray-500 mb-1.5">
                                Status
                            </label>
                            <Select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                options={[
                                    { value: 'OPEN', label: 'Open' },
                                    { value: 'CLOSED', label: 'Closed' },
                                    { value: 'PAUSED', label: 'Pause' },
                                ]}
                            />
                        </div>
                    </div>

                    <div className="mb-6 relative z-20">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 md:gap-3 mb-3">
                            <label className="text-base font-semibold text-gray-500 whitespace-nowrap">
                                Required skills
                            </label>
                            <div className="flex items-center gap-2 flex-grow max-w-full sm:max-w-sm">
                                <input
                                    type="text"
                                    value={newSkill}
                                    onChange={(e) => setNewSkill(e.target.value)}
                                    className="w-[123px] h-[23px] px-2 bg-[#F8FAFC] border border-[#B0B0B0] border-[0.8px] rounded-[5px] text-xs outline-none focus:border-accent"
                                    onKeyPress={(e) => e.key === 'Enter' && handleAddSkill(e)}
                                />
                                <button
                                    type="button"
                                    onClick={handleAddSkill}
                                    className="h-[27px] w-[63px] bg-accent/10 border-[0.8px] border-accent text-accent rounded-[5px] text-[16px] font-normal hover:bg-accent hover:text-white transition-all flex items-center justify-center gap-1"
                                >
                                    + Add
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {skills.map(skill => (
                                <div key={skill} className="flex items-center gap-2 px-3 py-1 border border-accent rounded-[5px] text-accent font-medium bg-white text-xs">
                                    {skill}
                                    <button type="button" onClick={() => removeSkill(skill)} className="hover:text-red-500 opacity-50 hover:opacity-100 transition-opacity">
                                        <X size={12} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mb-4 relative z-10">
                        <label className="block text-base font-semibold text-gray-500 mb-2">
                            Job description<span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            className={`w-full p-6 bg-[#F8FAFC] border-[0.8px] ${fieldErrors.description ? 'border-red-500' : 'border-[#B0B0B0]'} rounded-[20px] text-sm outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent resize-none h-[80px] shadow-sm`}
                            placeholder=""
                        ></textarea>
                        {fieldErrors.description && <p className="text-red-500 text-xs mt-1 font-medium">{fieldErrors.description}</p>}
                    </div>

                    <div className="flex items-center justify-end space-x-3 relative z-10">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isLoading}
                            className="flex items-center justify-center w-28 h-10 rounded-lg border border-accent text-accent bg-transparent hover:bg-accent/10 transition-colors text-base font-medium disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex items-center justify-center px-6 h-10 rounded-lg border border-accent bg-accent text-white hover:opacity-90 transition-opacity text-base font-medium disabled:opacity-75"
                        >
                            {isLoading ? (
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : null}
                            {isEditing ? 'Save changes' : 'Add vacancy'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
