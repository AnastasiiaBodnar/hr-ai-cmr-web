'use client'

import { useState } from 'react'
import Input from '@/app/components/ui/Input'
import Button from '@/app/components/ui/Button'
import Select from '@/app/components/ui/Select'
import Image from 'next/image'

export default function CandidateForm({ isEditing = false, onClose }) {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        position: '',
        salary: '',
        status: 'New',
        linkedIn: '',
        notes: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {/*Decorated item in background */}
                <div className="absolute -top-16 right-0 w-44 h-44 bg-purple-600/40 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute top-48 -left-36 w-64 h-64 bg-teal-600/30 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative z-10">
                    {/* Form header */}
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="relative w-12 h-8 shrink-0">
                            <Image src="/images/logo.png" alt="HR Logo" fill sizes="48px" className="object-contain" />
                        </div>
                        <h2 className="text-xl font-bold text-black">
                            {isEditing ? 'Edit card for candidate' : 'Create card for candidate'}
                        </h2>
                    </div>

                    {/* Main field grid (2 columns) */}
                    <div className="grid grid-cols-2 gap-5 mb-5">
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
                    <div className="grid grid-cols-3 gap-5 mb-5">
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
                                    { value: 'New', label: 'New' },
                                    { value: 'In Progress', label: 'In Progress' },
                                    { value: 'Interview', label: 'Interview' },
                                    { value: 'Hired', label: 'Hired' },
                                    { value: 'Rejected', label: 'Rejected' },
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
                    <div className="grid grid-cols-2 gap-5 mb-6">
                        <div>
                            <label className="block text-base font-semibold text-gray-500 mb-1.5">
                                Notes/Summary
                            </label>
                            <textarea
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm outline-none transition-colors focus:border-gray-400 resize-none h-[110px]"
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-base font-semibold text-transparent mb-1.5 select-none">
                                Upload
                            </label>
                            <div className="h-[110px] w-full border border-dashed border-teal-300 bg-[#E6F5F4] rounded-xl flex flex-col items-center justify-center p-3 cursor-pointer hover:bg-teal-50 transition-colors">
                                <svg className="w-6 h-6 text-teal-600 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p className="text-xs font-bold text-teal-800">Upload resume (PDF/.docs)</p>
                                <p className="text-[10px] text-teal-600/70 text-center mt-1 leading-tight">AI will automatically extra skills<br />and match to position</p>
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center justify-end space-x-3">
                        <Button type="button" variant="outline" onClick={onClose} className="!text-teal-600 !border-teal-200 hover:!bg-teal-50 !px-6 py-2 text-sm font-medium">
                            Cancel
                        </Button>
                        <Button type="button" variant="primary" className="!bg-teal-600 hover:!bg-teal-700 !border-none !px-6 py-2 text-sm font-medium">
                            {isEditing ? 'Edit candidate' : 'Add candidate'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
