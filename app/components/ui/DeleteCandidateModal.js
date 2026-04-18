"use client";

import Image from "next/image";

export default function DeleteCandidateModal({
                                                 isOpen,
                                                 candidateName,
                                                 onCancel,
                                                 onConfirm,
                                             }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30">
            <div className="w-[300px] rounded-[8px] bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
                <div className="flex items-start gap-3">
                    <Image src="/icons/hr.png" alt="HR" width={28} height={28} />

                    <div className="min-w-0">
                        <h3 className="text-[16px] font-semibold text-black">
                            Delete candidate
                        </h3>
                        <p className="mt-2 text-[14px] text-black/80">
                            Do you want to delete a candidate
                            {candidateName ? ` "${candidateName}"` : ""}?
                        </p>
                    </div>
                </div>

                <div className="mt-5 flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="h-[22px] min-w-[28px] rounded-[4px] border border-primary px-2 text-[12px] text-primary"
                    >
                        No
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        className="h-[22px] min-w-[46px] rounded-[4px] bg-primary px-3 text-[12px] text-white"
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
}