import Image from "next/image";

export default function AppTopbar() {
    return (
        <header className="flex h-[66px] items-center justify-between border-b border-black/10 bg-white px-6">
            <div className="flex w-full max-w-[280px] items-center rounded-xl border border-black/20 bg-white px-4 py-2">
                <span className="mr-3 text-gray-400">⌕</span>
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
                />
            </div>

            <div className="ml-6 flex items-center gap-6">
                <button className="flex h-10 w-10 items-center justify-center rounded-full">
                    <Image src="/icons/bell.png" alt="Notifications" width={20} height={20} />
                </button>

                <div className="flex items-center gap-3">
                    <Image
                        src="/icons/hr.icons.png"
                        alt="HR Manager"
                        width={36}
                        height={36}
                        className="rounded-full object-cover"
                    />
                    <div className="flex items-center gap-2 text-sm font-medium text-black">
                        <span>HR Manager</span>
                        <span className="text-xs">⌄</span>
                    </div>
                </div>
            </div>
        </header>
    );
}