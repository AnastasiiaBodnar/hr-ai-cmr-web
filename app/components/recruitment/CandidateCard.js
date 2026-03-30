import Image from "next/image";

export default function CandidateCard({ candidate, isSelected, onSelect }) {
    return (
        <button
            type="button"
            onClick={() => onSelect(candidate.id)}
            className={`w-full rounded-[10px] border bg-white px-3 py-3 text-left shadow-sm transition ${
                isSelected
                    ? "border-[#86E6BE] shadow-[0_2px_8px_rgba(16,185,129,0.15)]"
                    : "border-black/10"
            }`}
        >
            <div className="mb-2 flex items-start justify-between gap-2">
                <div className="min-w-0">
                    <p className="truncate text-[14px] font-semibold leading-tight text-black">
                        {candidate.fullName}
                    </p>
                    <p className="truncate text-[12px] leading-tight text-black/80">
                        {candidate.position}
                    </p>
                </div>

                <Image
                    src={candidate.avatar}
                    alt={candidate.fullName}
                    width={22}
                    height={22}
                    className="rounded-full object-cover"
                />
            </div>

            <div className="mt-4 flex items-end justify-between gap-2">
                <div className="min-h-[28px]">
                    {candidate.level ? (
                        <>
                            <p className="text-[11px] font-semibold leading-tight text-black">
                                {candidate.level}
                            </p>
                            <p className="text-[11px] font-semibold leading-tight text-black">
                                from 800$
                            </p>
                        </>
                    ) : null}
                </div>

                <p className="caption-text text-[11px] text-black/30">{candidate.createdAt}</p>
            </div>
        </button>
    );
}