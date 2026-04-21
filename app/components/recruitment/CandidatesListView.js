"use client";

import Image from "next/image";

function StatusBadge({ status }) {
    const map = {
        NEW: "bg-[#D9E5FB] text-[#2D4F9E]",
        SCREENING: "bg-[#B6E8C8] text-[#208F55]",
        INTERVIEW: "bg-[#F3DEB2] text-[#9A6A12]",
        TEST_TASK: "bg-[#F3DEB2] text-[#9A6A12]",
        OFFER: "bg-[#B6E8C8] text-[#208F55]",
        HIRED: "bg-[#B6E8C8] text-[#208F55]",
        REJECTED: "bg-[#F0C3C6] text-[#B24552]",
    };

    const labelMap = {
        NEW: "New",
        SCREENING: "Screening",
        INTERVIEW: "Interview",
        TEST_TASK: "Interview/Test",
        OFFER: "Offer",
        HIRED: "Hired",
        REJECTED: "Rejected",
    };

    return (
        <span
            className={`inline-flex min-w-[80px] justify-center rounded-full px-3 py-[4px] text-[12px] ${
                map[status] || "bg-[#EAEAEA] text-black/60"
            }`}
        >
      {labelMap[status] || status}
    </span>
    );
}

function SkillsCell({ candidate }) {
    const skills = Array.isArray(candidate.skills) ? candidate.skills : [];

    if (!skills.length) {
        return <span className="text-black/35">–</span>;
    }

    const colorClasses = [
        "bg-[#F0B8C1] text-[#A23949]",
        "bg-[#C6CEF7] text-[#2D468C]",
        "bg-[#E9DCA6] text-[#8E6D17]",
        "bg-[#D7C7C7] text-[#6E5353]",
    ];

    return (
        <div className="flex flex-wrap gap-2">
            {skills.slice(0, 4).map((skill, index) => (
                <span
                    key={`${skill}-${index}`}
                    className={`rounded-full px-3 py-[2px] text-[11px] ${
                        colorClasses[index % colorClasses.length]
                    }`}
                >
          {skill}
        </span>
            ))}
        </div>
    );
}

export default function CandidatesListView({
                                               candidates,
                                               onSelectCandidate,
                                               onDeleteCandidate,
                                               onEditCandidate,
                                           }) {
    return (
        <div className="h-full overflow-auto rounded-[16px] bg-[#EAEAEAA3] p-[8px] xl:p-[10px]">
            <div className="min-w-[1100px] overflow-hidden rounded-[12px] border border-black/10 bg-white">
                <div className="grid grid-cols-[1.6fr_1.3fr_1.3fr_1.2fr_1.2fr_1fr] border-b border-black/10 bg-white">
                    <div className="px-4 py-3 text-center text-[12px] text-black/45">Candidate</div>
                    <div className="border-l border-black/10 px-4 py-3 text-center text-[12px] text-black/45">Position</div>
                    <div className="border-l border-black/10 px-4 py-3 text-center text-[12px] text-black/45">Key skills</div>
                    <div className="border-l border-black/10 px-4 py-3 text-center text-[12px] text-black/45">Desired salary</div>
                    <div className="border-l border-black/10 px-4 py-3 text-center text-[12px] text-black/45">Status</div>
                    <div className="border-l border-black/10 px-4 py-3 text-center text-[12px] text-black/45">Edit</div>
                </div>

                <div>
                    {candidates.map((candidate) => (
                        <div
                            key={candidate.id}
                            className="grid grid-cols-[1.6fr_1.3fr_1.3fr_1.2fr_1.2fr_1fr] border-b border-[#30B8C8] last:border-b-0"
                        >
                            <button
                                type="button"
                                onClick={() => onSelectCandidate(candidate.id)}
                                className="flex items-center gap-3 px-4 py-3 text-left hover:bg-black/[0.02]"
                            >
                                <Image
                                    src={candidate.avatar}
                                    alt={candidate.fullName}
                                    width={26}
                                    height={26}
                                    className="rounded-full object-cover"
                                />
                                <div className="min-w-0">
                                    <p className="truncate text-[14px] font-semibold text-black">
                                        {candidate.fullName}
                                    </p>
                                    <p className="truncate text-[11px] text-black/45">
                                        {candidate.email}
                                    </p>
                                </div>
                            </button>

                            <div className="border-l border-black/10 px-4 py-3">
                                <p className="text-[14px] font-semibold text-black">
                                    {candidate.position}
                                </p>
                                <p className="text-[12px] text-black/55">
                                    {candidate.level || "—"}
                                </p>
                            </div>

                            <div className="border-l border-black/10 px-4 py-3">
                                <SkillsCell candidate={candidate} />
                            </div>

                            <div className="border-l border-black/10 px-4 py-3 text-center text-[13px] font-semibold text-black">
                                {candidate.salaryFrom || "—"}
                            </div>

                            <div className="border-l border-black/10 px-4 py-3 text-center">
                                <StatusBadge status={candidate.status} />
                            </div>

                            <div className="border-l border-black/10 px-4 py-3">
                                <div className="flex items-center justify-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => onSelectCandidate(candidate.id)}
                                        className="transition hover:opacity-70"
                                        aria-label="View candidate"
                                    >
                                        <Image src="/icons/view.png" alt="View" width={16} height={16} />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => onEditCandidate(candidate)}
                                        className="transition hover:opacity-70"
                                        aria-label="Edit candidate"
                                    >
                                        <Image src="/icons/edit.png" alt="Edit" width={16} height={16} />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => onDeleteCandidate(candidate)}
                                        className="transition hover:opacity-70"
                                        aria-label="Delete candidate"
                                    >
                                        <Image src="/icons/delete.png" alt="Delete" width={16} height={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}