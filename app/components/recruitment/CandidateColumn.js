import { useDroppable } from "@dnd-kit/core";
import CandidateCard from "./CandidateCard";

export default function CandidateColumn({
                                            columnKey,
                                            title,
                                            count,
                                            headerClassName,
                                            candidates,
                                            selectedCandidateId,
                                            onSelectCandidate,
                                            compact = false,
                                            wide = false,
                                            fluid = false,
                                            compactMode = false,
                                            pendingCandidateIds = [],
                                        }) {
    const { setNodeRef, isOver } = useDroppable({
        id: columnKey,
    });

    const scrollWidth = wide
        ? compactMode
            ? "w-[220px]"
            : "w-[250px]"
        : compactMode
            ? "w-[190px]"
            : "w-[240px]";

    const sectionClassName = fluid
        ? compact
            ? "flex h-[176px] min-w-0 flex-col rounded-[12px] bg-white p-[6px]"
            : "flex min-h-[176px] max-h-full min-w-0 flex-col rounded-[12px] bg-white p-[6px]"
        : compact
            ? `flex h-[176px] ${scrollWidth} shrink-0 flex-col rounded-[12px] bg-white p-[6px]`
            : `flex min-h-[176px] max-h-full ${scrollWidth} shrink-0 flex-col rounded-[12px] bg-white p-[6px]`;

    const contentClassName = compact
        ? "min-h-0 flex-1 overflow-y-auto"
        : "flex-1 overflow-y-auto";

    return (
        <section
            ref={setNodeRef}
            className={`${sectionClassName} ${isOver ? "ring-2 ring-primary/30" : ""}`}
        >
            <div
                className={`mb-[8px] flex h-[37px] w-full shrink-0 items-center justify-between rounded-[10px] px-[12px] text-[12px] font-normal ${headerClassName}`}
            >
                <div className="flex min-w-0 items-center gap-2">
                    <span className="text-[11px]">◉</span>
                    <span className="truncate">{title}</span>
                </div>
                <span className="shrink-0">({count})</span>
            </div>

            <div className={contentClassName}>
                {candidates.length ? (
                    <div className="flex flex-col gap-[8px] pr-[2px]">
                        {candidates.map((candidate) => (
                            <CandidateCard
                                key={candidate.id}
                                candidate={candidate}
                                isSelected={candidate.id === selectedCandidateId}
                                onSelect={onSelectCandidate}
                                fluid={fluid}
                                compactMode={compactMode}
                                isLoading={pendingCandidateIds.includes(candidate.id)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex h-[122px] items-center justify-center rounded-[10px] bg-white text-[14px] text-black/25">
                        empty
                    </div>
                )}
            </div>
        </section>
    );
}