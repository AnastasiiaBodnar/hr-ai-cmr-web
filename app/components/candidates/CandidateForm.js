'use client'

import Image from 'next/image'
import Input from '@/app/components/ui/Input'
import Button from '@/app/components/ui/Button'

export default function CandidateForm({ isEditing = false, onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8 overflow-hidden">
                <div className="relative z-10">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="relative w-12 h-8 shrink-0">
                            <Image src="/images/logo.png" alt="HR Logo" fill sizes="48px" className="object-contain" />
                        </div>
                        <h2 className="text-xl font-bold text-black">
                            {isEditing ? 'Edit card for candidate' : 'Create card for candidate'}
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 gap-5 mb-5">
                        <div>
                            <label className="block text-base font-semibold text-gray-500 mb-1.5">
                                Candidate fullname<span className="text-red-500">*</span>
                            </label>
                            <Input name="fullName" required className="py-2.5 text-sm" />
                        </div>
                        <div>
                            <label className="block text-base font-semibold text-gray-500 mb-1.5">
                                Email address<span className="text-red-500">*</span>
                            </label>
                            <Input type="email" name="email" required className="py-2.5 text-sm" />
                        </div>
                        <div>
                            <label className="block text-base font-semibold text-gray-500 mb-1.5">
                                Phone number
                            </label>
                            <Input type="tel" name="phone" className="py-2.5 text-sm" />
                        </div>
                        <div>
                            <label className="block text-base font-semibold text-gray-500 mb-1.5">
                                Position<span className="text-red-500">*</span>
                            </label>
                            <Input name="position" required className="py-2.5 text-sm" />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-5 mb-5">
                        <div>
                            <label className="block text-base font-semibold text-gray-500 mb-1.5">Desired salary</label>
                            <Input name="salary" className="py-2.5 text-sm" />
                        </div>
                        <div>
                            <label className="block text-base font-semibold text-gray-500 mb-1.5">Status</label>
                            <select name="status" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-gray-400 bg-white">
                                <option value="New">New</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Interview">Interview</option>
                                <option value="Hired">Hired</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-base font-semibold text-gray-500 mb-1.5">Profile LinkedIn</label>
                            <Input name="linkedIn" className="py-2.5 text-sm" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-5 mb-5">
                        <div>
                            <label className="block text-base font-semibold text-gray-500 mb-1.5">Notes/Summary</label>
                            <textarea name="notes" rows="4" className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm outline-none focus:border-gray-400 resize-none"></textarea>
                        </div>
                        <div>
                            <label className="block text-base font-semibold text-gray-500 mb-1.5">Upload resume (PDF/.docx)</label>
                            <input type="file" name="resume" accept=".pdf,.doc,.docx" className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm" />
                        </div>
                    </div>

                    <div className="flex items-center justify-end space-x-3">
                        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                        <Button type="button" variant="primary">
                            {isEditing ? 'Edit candidate' : 'Add candidate'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}