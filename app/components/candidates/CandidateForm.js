'use client'

import { useState, useRef } from 'react'
import Input from '@/app/components/ui/Input'
import Select from '@/app/components/ui/Select'
import Image from 'next/image'
import { createCandidate, updateCandidate, updateCandidateStatus } from '@/lib/candidates'

export default function CandidateForm({ isEditing = false, candidateId = null, initialData = null, onClose }) {
    const [formData, setFormData] = useState({
        fullName: initialData?.name || '',
        email: initialData?.email || '',
        phone: initialData?.phone || '',
        position: initialData?.position || '',
        salary: initialData?.expectedSalary || '',
        status: initialData?.currentStatus || 'NEW',
        linkedIn: initialData?.linkedInUrl || '',
        notes: initialData?.comment || '',
    })

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
    const [resumeFile, setResumeFile] = useState(null)
    const fileInputRef = useRef(null)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setResumeFile(e.target.files[0])
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setIsLoading(true)

        try {
            const payload = {
                name: formData.fullName,
                email: formData.email,
                phone: formData.phone || undefined,
                position: formData.position,
                expectedSalary: formData.salary || undefined,
                linkedInUrl: formData.linkedIn || undefined,
                comment: formData.notes || undefined,
                // cvUrl: formData.cvUrl // Add this when file upload is implemented
            }

            if (isEditing && candidateId) {
                await updateCandidate(candidateId, payload)

                // If status changed
                if (formData.status !== (initialData?.currentStatus || 'NEW')) {
                    await updateCandidateStatus(candidateId, formData.status)
                }
                setSuccessMessage('Candidate successfully updated!')
            } else {
                const response = await createCandidate(payload)
                const newCandidateId = response?.id

                if (newCandidateId && formData.status !== 'NEW') {
                    await updateCandidateStatus(newCandidateId, formData.status)
                }
                setSuccessMessage('Candidate successfully added!')

                // Clear form for new candidate
                setFormData({
                    fullName: '',
                    email: '',
                    phone: '',
                    position: '',
                    salary: '',
                    status: 'NEW',
                    linkedIn: '',
                    notes: '',
                })
                setResumeFile(null)
            }

            // Wait 2 seconds to let user read the success message, then close
            setTimeout(() => {
                setSuccessMessage(null)
                if (onClose) onClose(true)
            }, 2000)
        } catch (err) {
            setError(err.message || 'Failed to save candidate. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {/*Decorated item in background */}
                <div className="absolute -top-16 right-0 w-44 h-44 bg-purple-600/40 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute top-48 -left-36 w-64 h-64 bg-teal-600/30 rounded-full blur-3xl pointer-events-none"></div>

                <form className="relative z-10" onSubmit={handleSubmit}>
                    {/* Form header */}
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="relative w-12 h-8 shrink-0">
                            <Image src="/images/logo.png" alt="HR Logo" fill sizes="48px" className="object-contain" />
                        </div>
                        <h2 className="text-xl font-bold text-black">
                            {isEditing ? 'Edit card for candidate' : 'Create card for candidate'}
                        </h2>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg relative z-20">
                            {error}
                        </div>
                    )}

                    {successMessage && (
                        <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg relative z-20 flex items-center space-x-2">
                            <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{successMessage}</span>
                        </div>
                    )}

                    {/* Main field grid (2 columns) */}
                    <div className="grid grid-cols-2 gap-5 mb-5 relative z-40">
                        <div>
                            <label className="block text-base font-semibold text-gray-500 mb-1.5">
                                Candidate fullname<span className="text-red-500">*</span>
                            </label>
                            <Input name="fullName" value={formData.fullName} onChange={handleChange} required className="py-2.5 text-sm" />
                        </div>

                        <div>
                            <label className="block text-base font-semibold text-gray-500 mb-1.5">
                                Email address<span className="text-red-500">*</span>
                            </label>
                            <Input type="email" name="email" value={formData.email} onChange={handleChange} required className="py-2.5 text-sm" />
                        </div>

                        <div>
                            <label className="block text-base font-semibold text-gray-500 mb-1.5">
                                Phone number
                            </label>
                            <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="py-2.5 text-sm" />
                        </div>

                        <div>
                            <label className="block text-base font-semibold text-gray-500 mb-1.5">
                                Position<span className="text-red-500">*</span>
                            </label>
                            <Input name="position" value={formData.position} onChange={handleChange} required className="py-2.5 text-sm" />
                        </div>
                    </div>

                    {/* Bottom field grid (3 columns) */}
                    <div className="grid grid-cols-3 gap-5 mb-5 relative z-30">
                        <div>
                            <label className="block text-base font-semibold text-gray-500 mb-1.5">
                                Desired salary
                            </label>
                            <Input name="salary" value={formData.salary} onChange={handleChange} className="py-2.5 text-sm" />
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
                                    { value: 'NEW', label: 'New' },
                                    { value: 'SCREENING', label: 'Screening' },
                                    { value: 'INTERVIEW', label: 'Interview' },
                                    { value: 'TEST_TASK', label: 'Test Task' },
                                    { value: 'TEST_TALK', label: 'Test Talk' },
                                    { value: 'OFFER', label: 'Offer' },
                                    { value: 'HIRED', label: 'Hired' },
                                    { value: 'REJECTED', label: 'Rejected' },
                                ]}
                            />
                        </div>

                        <div>
                            <label className="block text-base font-semibold text-gray-500 mb-1.5">
                                Profile LinkedIn
                            </label>
                            <Input name="linkedIn" value={formData.linkedIn} onChange={handleChange} className="py-2.5 text-sm" />
                        </div>
                    </div>

                    {/* Notes and resume upload section */}
                    <div className="grid grid-cols-2 gap-5 mb-6 relative z-20">
                        <div>
                            <label className="block text-base font-semibold text-gray-500 mb-1.5">
                                Notes/Summary
                            </label>
                            <textarea
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm outline-none transition-colors focus:border-gray-400 focus:ring-1 focus:ring-gray-400 resize-none h-[110px]"
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-base font-semibold text-transparent mb-1.5 select-none">
                                Upload
                            </label>
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="h-[110px] w-full border border-dashed border-teal-300 bg-[#E6F5F4] rounded-xl flex flex-col items-center justify-center p-3 cursor-pointer hover:bg-teal-50 transition-colors"
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept=".pdf,.doc,.docx"
                                    className="hidden"
                                />
                                {resumeFile ? (
                                    <div className="flex flex-col items-center text-center">
                                        <svg className="w-8 h-8 text-teal-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <p className="text-xs font-bold text-teal-800 line-clamp-1 truncate px-2 w-full max-w-[150px]">{resumeFile.name}</p>
                                        <p className="text-[10px] text-teal-600/80 mt-1 cursor-pointer hover:underline" onClick={(e) => { e.stopPropagation(); setResumeFile(null); }}>Remove file</p>
                                    </div>
                                ) : (
                                    <>
                                        <svg className="w-6 h-6 text-teal-600 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <p className="text-xs font-bold text-teal-800">Upload resume (PDF/.docs)</p>
                                        <p className="text-[10px] text-teal-600/70 text-center mt-1 leading-tight">AI will automatically extra skills<br />and match to position</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
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
                            {isEditing ? 'Edit candidate' : 'Add candidate'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
