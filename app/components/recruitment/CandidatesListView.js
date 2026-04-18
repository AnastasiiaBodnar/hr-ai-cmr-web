import Image from "next/image";

function StatusBadge({ status }) {
    const map = {
        NEW: "bg-[#AFC7EC] text-[#1536B5]",
        SCREENING: "bg-[#9FE3B1] text-[#1A7A3E]",
        INTERVIEW: "bg-[#F2D8A4] text-[#A46B14]",
        TEST_TASK: "bg-[#F2D8A4] text-[#A46B14]",
        OFFER: "bg-[#9FE3AE] text-[#2D9448]",
        HIRED: "bg-[#67E17C] text-[#1E7A2F]",
        REJECTED: "bg-[#F0B4B8] text-[#B23840]",
    };

    const labelMap = {
        NEW: "New",
        SCREENING: "Screening",
        INTERVIEW: "Interview/Test",
        TEST_TASK: "Interview/Test",
        OFFER: "Offer",
        HIRED: "Hired",
        REJECTED: "Rejected",
    };

    return (
        <span
            className={`inline-flex min-w-[78px] items-center justify-center rounded-full px-4 py-[4px] text-[12px] ${map[status] || "bg-black/5 text-black/60"}`}
        >
      {labelMap[status] || status}
    </span>
    );
}

function SkillPill({ children, className = "" }) {
    return (
        <span className={`rounded-full px-3 py-[2px] text-[11px] ${className}`}>
      {children}
    </span>
    );
}

function SkillStack({ candidate }) {
    const palette = [
        "bg-[#F0B8C1] text-[#A23949]",
        "bg-[#C6CEF7] text-[#2D468C]",
        "bg-[#D7C7C7] text-[#6E5353]",
    ];

    const skills = candidate.skills?.slice(0, 3) || [];

    if (!skills.length) return <span className="text-[12px] text-black/35">–</span>;

    return (
        <div className="flex flex-wrap gap-1">
            {skills.map((skill, index) => (
                <SkillPill key={skill} className={palette[index % palette.length]}>
                    {skill}
                </SkillPill>
            ))}
        </div>
    );
}

function ActionIconButton({ src, alt, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex h-[24px] w-[24px] items-center justify-center"
        >
            <Image src={src} alt={alt} width={15} height={15} />
        </button>
    );
}

export default function CandidatesListView({
                                               candidates,
                                               onSelectCandidate,
                                               onDeleteCandidate,
                                           }) {
    return (
        <div className="min-h-0 flex-1 rounded-[14px] bg-white overflow-hidden border border-black/10">
            <div className="grid grid-cols-[1.4fr_1.1fr_1.2fr_1fr_1fr_1fr] border-b border-black/20 bg-white text-[12px] text-black/40">
                <div className="px-4 py-3 text-center">Candidate</div>
                <div className="border-l border-black/20 px-4 py-3 text-center">Position</div>
                <div className="border-l border-black/20 px-4 py-3 text-center">Key skills</div>
                <div className="border-l border-black/20 px-4 py-3 text-center">Desired salary</div>
                <div className="border-l border-black/20 px-4 py-3 text-center">Status</div>
                <div className="border-l border-black/20 px-4 py-3 text-center">Edit</div>
            </div>

            <div className="max-h-full overflow-y-auto">
                {candidates.map((candidate) => (
                    <div
                        key={candidate.id}
                        className="grid grid-cols-[1.4fr_1.1fr_1.2fr_1fr_1fr_1fr] border-b border-[#13B5C8]"
                    >
                        <button
                            type="button"
                            onClick={() => onSelectCandidate(candidate.id)}
                            className="flex items-center gap-3 px-3 py-3 text-left"
                        >
                            <Image
                                src={candidate.avatar}
                                alt={candidate.fullName}
                                width={24}
                                height={24}
                                className="rounded-full object-cover"
                            />
                            <div className="min-w-0">
                                <p className="truncate text-[14px] font-semibold text-black">
                                    {candidate.fullName}
                                </p>
                                <p className="truncate text-[11px] text-black/45">{candidate.email}</p>
                            </div>
                        </button>

                        <div className="border-l border-black/20 px-3 py-3">
                            <p className="text-[14px] font-semibold text-black">{candidate.position}</p>
                            <p className="text-[12px] text-black/60">{candidate.level || "Middle"}</p>
                        </div>

                        <div className="border-l border-black/20 px-3 py-3">
                            <SkillStack candidate={candidate} />
                        </div>

                        <div className="border-l border-black/20 px-3 py-3 text-[12px] font-semibold text-black">
                            {candidate.salaryFrom || "–"}
                        </div>

                        <div className="border-l border-black/20 px-3 py-3">
                            <StatusBadge status={candidate.status} />
                        </div>

                        <div className="border-l border-black/20 px-3 py-3">
                            <div className="flex items-center justify-center gap-2">
                                <ActionIconButton src="/icons/view.png" alt="View" />
                                <ActionIconButton src="/icons/download.png" alt="Download" />
                                <ActionIconButton src="/icons/edit.png" alt="Edit" />
                                <ActionIconButton
                                    src="/icons/delete.png"
                                    alt="Delete"
                                    onClick={() => onDeleteCandidate(candidate)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}