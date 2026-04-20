'use client'

import React from 'react';

import Image from 'next/image';

const DeleteVacancyModal = ({ onClose, onConfirm, isLoading }) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="relative w-[358px] h-[142px] bg-white rounded-[10px] shadow-2xl px-5 py-4 animate-in fade-in zoom-in-95 duration-200 flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <div className="relative w-[42px] h-[32px] shrink-0">
                            <Image src="/images/logo.png" alt="HR Logo" fill sizes="42px" className="object-contain" />
                        </div>
                        <h2 className="text-[24px] font-semibold text-black leading-tight">Delete vacancy</h2>
                    </div>

                    <div>
                        <p className="text-black text-[16px] font-normal leading-normal">
                            Do you want to delete a vacancy?
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-2">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="w-[35px] h-[23px] flex items-center justify-center rounded-[5px] border-[0.8px] border-[#002293] text-[#002293] text-[12px] font-normal hover:bg-[#002293]/5 transition-colors disabled:opacity-50"
                    >
                        No
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="w-[68px] h-[23px] flex items-center justify-center rounded-[5px] bg-[#002293] text-white text-[12px] font-normal hover:opacity-90 transition-opacity disabled:opacity-75"
                    >
                        {isLoading ? (
                            <div className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : 'Yes'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteVacancyModal;
