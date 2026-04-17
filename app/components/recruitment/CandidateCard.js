import Image from "next/image";

export default function CandidateCard({
                                          candidate,
                                          isSelected,
                                          onSelect,
                                          fluid = false,
                                          compactMode = false,
                                      }) {
    const hasMeta = Boolean(candidate.level && candidate.salaryFrom);
    const cardHeightClass = hasMeta ? "h-[120px]" : "h-[110px]";

    const cardWidthClass = fluid
        ? "w-full"
        : compactMode
            ? "w-[178px]"
            : "w-[220px]";

    return (
        <button
            type="button"
            onClick={() => onSelect(candidate.id)}
            className={`${cardWidthClass} ${cardHeightClass} rounded-[10px] border bg-white px-[12px] py-[10px] text-left shadow-sm transition ${
                isSelected
                    ? "border-[#86E6BE] shadow-[0_2px_8px_rgba(16,185,129,0.15)]"
                    : "border-black/10"
            }`}
        >
            <div className="flex h-full flex-col justify-between">
                <div>
                    <div className="mb-[8px] flex items-start justify-between gap-2">
                        <div className="min-w-0">
                            <p className="truncate text-[13px] font-semibold leading-[1.1] text-black">
                                {candidate.fullName}
                            </p>
                            <p className="truncate text-[11px] leading-[1.15] text-black/80">
                                {candidate.position}
                            </p>

                            {candidate.email ? (
                                <p className="truncate text-[10px] text-black/35">
                                    {candidate.email}
                                </p>
                            ) : null}
                        </div>

                        <Image
                            src={candidate.avatar}
                            alt={candidate.fullName}
                            width={22}
                            height={22}
                            className="rounded-full object-cover"
                        />
                    </div>
                </div>

                <div className="flex items-end justify-between gap-2">
                    <div className="min-h-[24px]">
                        {hasMeta ? (
                            <>
                                <p className="text-[10px] font-semibold leading-tight text-black">
                                    {candidate.level}
                                </p>
                                <p className="text-[10px] font-semibold leading-tight text-black">
                                    {candidate.salaryFrom}
                                </p>
                            </>
                        ) : null}
                    </div>

                    <p className="caption-text text-[10px] text-black/30">
                        {candidate.createdAt}
                    </p>
                </div>
            </div>
        </button>
    );
}