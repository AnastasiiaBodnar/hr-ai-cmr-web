"use client";

import Image from "next/image";

export default function AppTopbar({ searchValue, onSearchChange }) {
    return (
        <header className="flex h-[66px] w-full shrink-0 items-center justify-between border-b border-black/10 bg-white px-4 lg:px-6 xl:px-8">
            <div className="flex h-[40px] w-full max-w-[360px] items-center rounded-[12px] border border-black/15 bg-white px-4">
                <span className="mr-3 text-sm text-black/35">⌕</span>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchValue}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full bg-transparent text-[14px] text-black outline-none placeholder:text-black/35"
                />
            </div>

            <div className="ml-6 flex items-center gap-4 xl:gap-5">
                <button className="flex h-10 w-10 items-center justify-center rounded-full">
                    <Image src="/icons/bell.png" alt="Notifications" width={20} height={20} />
                </button>

                <div className="flex items-center gap-3">
                    <Image
                        src="/icons/hr.icons.png"
                        alt="HR Manager"
                        width={38}
                        height={38}
                        className="rounded-full object-cover"
                    />
                    <div className="flex items-center gap-2">
                        <span className="text-[14px] font-medium text-black">HR Manager</span>
                        <Image
                            src="/icons/arrow.png"
                            alt="Open profile menu"
                            width={10}
                            height={10}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}