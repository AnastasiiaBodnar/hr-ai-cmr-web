import Image from "next/image";

export default function AppSidebar() {
    return (
        <aside className="flex w-[103px] shrink-0 flex-col items-center bg-primary py-6 text-white">
            <div className="mb-16">
                <Image src="/icons/hr.png" alt="AI logo" width={44} height={44} />
            </div>

            <button className="flex flex-col items-center gap-2 rounded-2xl px-3 py-3">
                <Image src="/icons/group.png" alt="Candidates" width={24} height={24} />
                <span className="text-[14px] font-normal leading-none text-white">
          candidates
        </span>
            </button>
        </aside>
    );
}