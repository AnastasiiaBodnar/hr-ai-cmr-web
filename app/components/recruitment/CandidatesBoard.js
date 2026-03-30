import { CANDIDATE_STATUSES } from "@/lib/constants/candidate-statuses";
import CandidateColumn from "./CandidateColumn";

export default function CandidatesBoard({
                                            candidates,
                                            selectedCandidateId,
                                            onSelectCandidate,
                                        }) {
    return (
        <main className="flex-1 bg-background px-6 py-7">
            <div className="mb-8 flex items-end gap-4">
                <h1 className="text-[32px] font-bold leading-none text-black">
                    AI CRM Candidates
                </h1>
                <span className="text-[32px] leading-none text-black">|</span>
                <h2 className="text-2xl font-semibold leading-none text-black">
                    Recruitment panel
                </h2>
            </div>

            <div className="mb-6 flex items-center justify-between rounded-[20px] border border-black/10 bg-white px-5 py-4">
                <div className="flex items-center gap-4">
                    <span className="text-base font-medium text-black">Filter by</span>

                    <button className="rounded-full border border-black/10 px-4 py-2 text-sm text-black/70">
                        Position
                    </button>

                    <button className="rounded-full border border-black/10 px-4 py-2 text-sm text-black/70">
                        Status
                    </button>
                </div>

                <button className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white">
                    Add candidates
                </button>
            </div>

            <div className="overflow-x-auto">
                <div className="flex min-w-max gap-4">
                    {CANDIDATE_STATUSES.map((status) => {
                        const items = candidates.filter(
                            (candidate) => candidate.status === status.key
                        );

                        return (
                            <CandidateColumn
                                key={status.key}
                                title={status.label}
                                count={items.length}
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