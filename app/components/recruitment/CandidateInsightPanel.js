import Image from "next/image";

export default function CandidateInsightPanel({ candidate }) {
    if (!candidate) {
        return (
            <aside className="w-[263px] shrink-0 border-l border-black/10 bg-white px-4 py-8">
                <p className="text-sm text-black/60">Select a candidate</p>
            </aside>
        );
    }

    return (
        <aside className="w-[263px] shrink-0 border-l border-black/10 bg-white px-4 py-8">
            <h2 className="mb-6 text-[24px] font-semibold leading-tight text-black">
                AI Resume insight
            </h2>

            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold text-black">{candidate.fullName}</h3>
                    <p className="text-base text-black/80">{candidate.position}</p>
                </div>

                <div>
                    <p className="mb-3 text-xl font-semibold text-black">Match %</p>
                    <div className="flex items-center gap-4">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full border-[6px] border-secondary text-center">
                            <div className="leading-tight">
                                <div className="text-2xl font-bold">{candidate.matchPercent}%</div>
                                <div className="text-xs">match</div>
                            </div>
                        </div>

                        <div>
                            <p className="text-[18px] font-semibold leading-tight text-black">
                                {candidate.level} {candidate.position}
                            </p>
                            <p className="text-base text-black/80">Vacancy</p>
                        </div>
                    </div>
                </div>

                <div>
                    <p className="mb-3 text-xl font-semibold text-black">Key skills</p>
                    <div className="flex flex-wrap gap-2">
                        {candidate.skills.map((skill) => (
                            <span
                                key={skill}
                                className="rounded-full bg-black/5 px-3 py-1 text-sm text-black/70"
                            >
                {skill}
              </span>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <p className="mb-2 text-xl font-semibold text-black">Experience</p>
                        <p className="text-[18px] font-semibold text-black">
                            {candidate.experience}
                        </p>
                    </div>

                    <div>
                        <p className="mb-2 text-xl font-semibold text-black">Level</p>
                        <p className="text-[18px] font-semibold text-black">{candidate.level}</p>
                    </div>
                </div>

                <div>
                    <p className="mb-3 text-xl font-semibold text-black">Summary</p>
                    <p className="text-sm leading-6 text-black/80">{candidate.summary}</p>
                </div>

                <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-secondary/40 px-4 py-3 text-sm font-medium text-primary">
                    <Image src="/icons/ai.png" alt="AI" width={18} height={18} />
                    <span>Re-Analyze match</span>
                </button>
            </div>
        </aside>
    );
}