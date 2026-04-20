'use client'

import React from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

const DeleteVacancyModal = ({ onClose, onConfirm, isLoading }) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="relative w-12 h-8 shrink-0">
                        <Image src="/images/logo.png" alt="HR Logo" fill sizes="48px" className="object-contain" />
                    </div>
                    <h2 className="text-xl font-bold text-black">Delete vacancy</h2>
                </div>

                <div className="mb-8">
                    <p className="text-gray-600 text-lg leading-relaxed">
                        Do you want to delete a vacancy? This action cannot be undone.
                    </p>
                </div>

                <div className="flex items-center justify-end space-x-3">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="px-6 h-11 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors font-semibold disabled:opacity-50"
                    >
                        No
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="px-8 h-11 rounded-xl bg-primary text-white hover:opacity-90 transition-opacity font-semibold disabled:opacity-75 flex items-center justify-center"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : 'Yes'}
                    </button>
                </div>

                <div className="absolute -top-12 -right-12 w-24 h-24 bg-red-500/10 rounded-full blur-2xl pointer-events-none"></div>
                <div className="absolute -bottom-12 -left-12 w-24 h-24 bg-primary/10 rounded-full blur-2xl pointer-events-none"></div>
            </div>
        </div>
    );
};

export default DeleteVacancyModal;
