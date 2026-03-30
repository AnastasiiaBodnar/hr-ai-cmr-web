import Image from "next/image";

export default function AppSidebar() {
    return (
        <aside className="flex h-screen w-[103px] shrink-0 flex-col items-center bg-primary py-5 text-white">
            <div className="mb-14 mt-1 flex h-[46px] w-[46px] items-center justify-center">
                <Image src="/icons/hr.png" alt="HR logo" width={46} height={46} />
            </div>

            <button className="flex flex-col items-center gap-2 rounded-[18px] px-3 py-3">
                <Image src="/icons/group.png" alt="Candidates" width={24} height={24} />
                <span className="caption-text text-[14px] font-normal leading-none text-white">
          candidates
        </span>
            </button>
        </aside>
    );
}