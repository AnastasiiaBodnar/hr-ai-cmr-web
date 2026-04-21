"use client";

import Image from "next/image";

export default function AppTopbar({
                                      searchValue = "",
                                      onSearchChange = () => {},
                                      onOpenSidebar,
                                  }) {
    return (
        <header className="h-[66px] shrink-0 border-b border-black/17 bg-white px-4 md:px-12 flex items-center justify-between z-30">
            <div className="flex items-center gap-4">
                {onOpenSidebar ? (
                    <button
                        type="button"
                        onClick={onOpenSidebar}
                        className="md:hidden p-2 -ml-2 text-gray-600 hover:text-primary transition-colors"
                        aria-label="Open sidebar"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    </button>
                ) : null}

                <div className="relative w-[180px] sm:w-[240px] md:w-[320px] lg:w-[420px]">
                    <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search..."
                        className="h-[46px] w-full rounded-[14px] border border-black/15 bg-white pl-11 pr-4 text-[16px] text-black outline-none placeholder:text-black/30"
                    />

                    <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="text-black/30"
                        >
                            <path
                                d="M21 21L16.65 16.65"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <circle
                                cx="11"
                                cy="11"
                                r="6"
                                stroke="currentColor"
                                strokeWidth="2"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button
                    type="button"
                    className="flex h-9 w-9 items-center justify-center rounded-full text-black/70 hover:bg-black/5"
                    aria-label="Notifications"
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            d="M15 17H9M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 11.0902 5.22309 13.206 4.34966 14.6054C3.61513 15.7827 4.45876 17 5.84615 17H18.1538C19.5412 17 20.3849 15.7827 19.6503 14.6054C18.7769 13.206 18 11.0902 18 8Z"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9984 21.7295C12.6949 21.9044 12.3507 21.9963 12.0005 21.996C11.6502 21.9958 11.3062 21.9034 11.003 21.7282C10.6998 21.553 10.4479 21.3011 10.2725 20.998"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>

                <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-gray-100">
                        <Image
                            src="/images/avatar.png"
                            alt="Profile"
                            fill
                            sizes="40px"
                            className="object-cover"
                        />
                    </div>

                    <span className="text-base font-medium text-gray-900">HR Manager</span>

                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-black/65"
                    >
                        <path
                            d="M6 9L12 15L18 9"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </div>
        </header>
    );
}