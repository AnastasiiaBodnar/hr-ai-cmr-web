import Image from "next/image";

export default function CandidateInsightPanel({ candidate }) {
    if (!candidate) {
        return (
            <aside className="w-[263px] shrink-0 bg-white px-4 py-7">
                <p className="text-sm text-black/60">Select a candidate</p>
            </aside>
        );
    }

    return (
        <aside className="w-[263px] shrink-0 bg-white px-4 py-7">
            <h2 className="mb-5 text-[24px] font-semibold leading-tight text-black">
                AI Resume insight
            </h2>

            <div className="space-y-7">
                <div>
                    <h3 className="text-[16px] font-semibold leading-tight text-black">
                        {candidate.fullName}
                    </h3>
                    <p className="text-[14px] leading-tight text-black/80">
                        {candidate.position}
                    </p>
                </div>

                <div>
                    <p className="mb-3 text-[16px] font-semibold text-black">Match %</p>

                    <div className="flex items-center gap-3">
                        <div className="relative flex h-[72px] w-[72px] items-center justify-center rounded-full border-[6px] border-secondary">
                            <div className="text-center leading-tight">
                                <div className="text-[15px] font-bold text-black">
                                    {candidate.matchPercent}%
                                </div>
                                <div className="caption-text text-[10px] text-black/70">match</div>
                            </div>
                        </div>

                        <div className="max-w-[120px]">
                            <p className="text-[14px] font-semibold leading-tight text-black">
                                {candidate.level ? `${candidate.level} ${candidate.position}` : candidate.position}
                            </p>
                            <p className="text-[14px] leading-tight text-black">Vacancy</p>
                        </div>
                    </div>
                </div>

                <div>
                    <p className="mb-3 text-[16px] font-semibold text-black">Key skills</p>
                    <div className="flex flex-wrap gap-2">
                        {candidate.skills.map((skill, index) => {
                            const skillClasses = [
                                "bg-[#F0B8C1] text-[#A23949]",
                                "bg-[#C6CEF7] text-[#2D468C]",
                                "bg-[#E9DCA6] text-[#8E6D17]",
                                "bg-[#D7C7C7] text-[#6E5353]",
                            ];

                            return (
                                <span
                                    key={skill}
                                    className={`rounded-full px-3 py-[3px] text-[12px] ${skillClasses[index % skillClasses.length]}`}
                                >
                  {skill}
                </span>
                            );
                        })}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                    <div>
                        <p className="mb-2 text-[16px] font-semibold text-black">Experience</p>
                        <p className="text-[14px] font-semibold text-black">{candidate.experience}</p>
                    </div>

                    <div>
                        <p className="mb-2 text-[16px] font-semibold text-black">Level</p>
                        <p className="text-[14px] font-semibold text-black">
                            {candidate.level || "Middle"}
                        </p>
                    </div>
                </div>

                <div>
                    <p className="mb-3 text-[16px] font-semibold text-black">Summary</p>
                    <p className="text-[12px] leading-[1.45] text-black/85">{candidate.summary}</p>
                </div>

                <button className="flex h-[30px] w-full items-center justify-center gap-2 rounded-[3px] bg-[#C8B0F0] px-4 text-[12px] text-[#5E3E98]">
                    <Image src="/icons/ai.png" alt="AI" width={14} height={14} />
                    <span>Re-Analyze match</span>
                </button>
            </div>
        </aside>
    );
}