import Image from "next/image";

const sidebarItems = [
    {
        label: "dashboard",
        icon: "/icons/dashboard.png",
        alt: "Dashboard",
    },
    {
        label: "candidates",
        icon: "/icons/group.png",
        alt: "Candidates",
    },
    {
        label: "vacancy",
        icon: "/icons/bag.png",
        alt: "Vacancy",
    },
];

export default function AppSidebar() {
    return (
        <aside className="flex h-screen w-[103px] shrink-0 flex-col items-center bg-primary py-5 text-white">
            <div className="mb-14 mt-1 flex h-[46px] w-[46px] items-center justify-center">
                <Image src="/icons/hr.png" alt="HR logo" width={46} height={46} />
            </div>

            <nav className="flex flex-col items-center gap-7">
                {sidebarItems.map((item) => (
                    <button
                        key={item.label}
                        type="button"
                        className="flex flex-col items-center gap-2 rounded-[18px] px-3 py-2"
                    >
                        <Image src={item.icon} alt={item.alt} width={20} height={20} />
                        <span className="caption-text text-[12px] leading-none text-white">
              {item.label}
            </span>
                    </button>
                ))}
            </nav>
        </aside>
    );
}