import CandidateCard from "./CandidateCard";

export default function CandidateColumn({
                                            title,
                                            count,
                                            headerClassName,
                                            candidates,
                                            selectedCandidateId,
                                            onSelectCandidate,
                                            fullHeight = false,
                                            compact = false,
                                        }) {
    const sectionClassName = fullHeight
        ? "flex min-h-0 h-full w-[200px] shrink-0 flex-col rounded-[10px] bg-white p-[5px]"
        : "flex h-[176px] w-[200px] shrink-0 flex-col rounded-[10px] bg-white p-[5px]";

    return (
        <section className={sectionClassName}>
            <div
                className={`mb-[6px] flex h-[37px] w-[190px] shrink-0 items-center justify-between rounded-[9px] px-[12px] text-[12px] font-normal ${headerClassName}`}
            >
                <div className="flex items-center gap-2">
                    <span className="text-[11px]">◉</span>
                    <span>{title}</span>
                </div>
                <span>({count})</span>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto">
                {candidates.length ? (
                    <div className="flex flex-col items-center gap-[6px] pr-[2px]">
                        {candidates.map((candidate) => (
                            <CandidateCard
                                key={candidate.id}
                                candidate={candidate}
                                isSelected={candidate.id === selectedCandidateId}
                                onSelect={onSelectCandidate}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex h-full items-center justify-center rounded-[8px] bg-white text-[14px] text-black/25">
                        empty
                    </div>
                )}
            </div>
        </section>
    );
}