import CandidateCard from "./CandidateCard";

export default function CandidateColumn({
                                            title,
                                            count,
                                            headerClassName,
                                            candidates,
                                            selectedCandidateId,
                                            onSelectCandidate,
                                        }) {
    return (
        <section className="w-[186px] shrink-0 rounded-[12px] bg-[#F1F1F1] p-[4px]">
            <div
                className={`mb-[6px] flex h-[32px] items-center justify-between rounded-[9px] px-[12px] text-[12px] font-normal ${headerClassName}`}
            >
                <div className="flex items-center gap-2">
                    <span className="text-[11px]">◉</span>
                    <span>{title}</span>
                </div>
                <span>({count})</span>
            </div>

            <div className="flex min-h-[150px] flex-col gap-[6px]">
                {candidates.length ? (
                    candidates.map((candidate) => (
                        <CandidateCard
                            key={candidate.id}
                            candidate={candidate}
                            isSelected={candidate.id === selectedCandidateId}
                            onSelect={onSelectCandidate}
                        />
                    ))
                ) : (
                    <div className="flex min-h-[126px] items-center justify-center rounded-[10px] bg-[#F8F8F8] text-[14px] text-black/25">
                        empty
                    </div>
                )}
            </div>
        </section>
    );
}