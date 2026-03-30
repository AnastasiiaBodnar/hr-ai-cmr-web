import { CANDIDATE_STATUSES } from "@/lib/constants/candidate-statuses";
import CandidateColumn from "./CandidateColumn";

export default function CandidatesBoard({
                                            candidates,
                                            selectedCandidateId,
                                            onSelectCandidate,
                                        }) {
    return (
        <main className="flex-1 bg-background px-5 py-5">
            <div className="mb-4 flex items-end gap-4 px-3 pt-2">
                <h1 className="text-[32px] font-bold leading-none text-black">
                    AI CRM Candidates
                </h1>
                <span className="text-[30px] leading-none text-black">|</span>
                <h2 className="text-[24px] font-semibold leading-none text-black">
                    Recruitment panel
                </h2>
            </div>

            <div className="mb-4 flex items-center justify-between px-3">
                <div className="flex items-center gap-3">
                    <span className="text-[16px] font-normal text-black">Filter by</span>

                    <button className="flex h-[30px] items-center rounded-md border border-black/15 bg-white px-3 text-[13px] text-black/50">
                        Position
                        <span className="ml-1 text-[10px]">⌄</span>
                    </button>

                    <button className="flex h-[30px] items-center rounded-md border border-black/15 bg-white px-3 text-[13px] text-black/50">
                        Status
                        <span className="ml-1 text-[10px]">⌄</span>
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <button className="h-[28px] rounded-[4px] bg-primary px-4 text-[13px] font-normal text-white">
                        Add candidates +
                    </button>
                    <span className="text-[15px] text-primary">☰</span>
                    <span className="text-[15px] text-primary">⊞</span>
                </div>
            </div>

            <div className="overflow-x-auto">
                <div className="flex min-w-max gap-3 rounded-[18px] bg-white/50 p-2">
                    {CANDIDATE_STATUSES.map((status) => {
                        const items = candidates.filter(
                            (candidate) => candidate.status === status.key
                        );

                        return (
                            <CandidateColumn
                                key={status.key}
                                title={status.label}
                                count={items.length}
                                headerClassName={status.headerClassName}
                                candidates={items}
                                selectedCandidateId={selectedCandidateId}
                                onSelectCandidate={onSelectCandidate}
                            />
                        );
                    })}
                </div>
            </div>
        </main>
    );
}