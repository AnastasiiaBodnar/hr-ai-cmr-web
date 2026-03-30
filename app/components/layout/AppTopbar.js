import Image from "next/image";

export default function AppTopbar() {
    return (
        <header className="flex h-[66px] items-center justify-between border-b border-black/8 bg-white px-6">
            <div className="flex h-[40px] w-full max-w-[280px] items-center rounded-full border border-black/10 bg-[#F8FAFC] px-4">
                <span className="mr-3 text-sm text-black/40">⌕</span>
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full bg-transparent text-[14px] text-black outline-none placeholder:text-black/35"
                />
            </div>

            <div className="ml-6 flex items-center gap-5">
                <button className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-black/5">
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
                        <span className="text-[12px] text-black/55">⌄</span>
                    </div>
                </div>
            </div>
        </header>
    );
}