import CandidateCard from "./CandidateCard";

export default function CandidateColumn({
                                            title,
                                            count,
                                            candidates,
                                            selectedCandidateId,
                                            onSelectCandidate,
                                        }) {
    return (
        <section className="w-[230px] shrink-0 rounded-[24px] bg-white p-3">
            <div className="mb-4 flex items-center justify-between px-1">
                <h3 className="text-base font-semibold text-black">{title}</h3>
                <span className="rounded-full bg-black/5 px-2.5 py-1 text-xs font-medium text-black/70">
          {count}
        </span>
            </div>

            <div className="flex flex-col gap-3">
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
                    <div className="rounded-[20px] border border-dashed border-black/10 px-4 py-8 text-center text-sm text-black/40">
                        No candidates
                    </div>
                )}
            </div>
        </section>
    );
}