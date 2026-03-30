import Image from "next/image";
import CandidateColumn from "./CandidateColumn";
import { CANDIDATE_STATUSES } from "@/lib/constants/candidate-statuses";

const PRIMARY_COLUMNS = ["NEW", "SCREENING", "INTERVIEW", "TEST_TASK"];
const STACKED_COLUMNS = ["OFFER", "HIRED", "REJECTED"];

export default function CandidatesBoard({
                                            candidates,
                                            selectedCandidateId,
                                            onSelectCandidate,
                                        }) {
    const getCandidatesByStatus = (statusKey) =>
        candidates.filter((candidate) => candidate.status === statusKey);

    const getStatusMeta = (statusKey) =>
        CANDIDATE_STATUSES.find((status) => status.key === statusKey);

    return (
        <main className="flex-1 overflow-hidden bg-background px-[10px] py-[12px]">
            <div className="mb-3 flex items-end gap-4 px-[8px] pt-[6px]">
                <h1 className="text-[32px] font-bold leading-none text-black">
                    AI CRM Candidates
                </h1>
                <span className="text-[30px] leading-none text-black">|</span>
                <h2 className="text-[24px] font-semibold leading-none text-black">
                    Recruitment panel
                </h2>
            </div>

            <div className="mb-2 flex items-center justify-between px-[8px]">
                <div className="flex items-center gap-2">
                    <span className="text-[16px] font-normal text-black">Filter by</span>

                    <button className="flex h-[30px] items-center gap-1 rounded-[4px] border border-black/15 bg-white px-3 text-[13px] text-black/50">
                        <span>Position</span>
                        <Image
                            src="/icons/arrow.png"
                            alt="Open position filter"
                            width={10}
                            height={10}
                        />
                    </button>

                    <button className="flex h-[30px] items-center gap-1 rounded-[4px] border border-black/15 bg-white px-3 text-[13px] text-black/50">
                        <span>Status</span>
                        <Image
                            src="/icons/arrow.png"
                            alt="Open status filter"
                            width={10}
                            height={10}
                        />
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <button className="h-[28px] rounded-[4px] bg-primary px-4 text-[13px] font-normal text-white">
                        Add candidates +
                    </button>

                    <button
                        type="button"
                        className="flex h-[20px] w-[20px] items-center justify-center"
                    >
                        <Image src="/icons/list.png" alt="List view" width={16} height={16} />
                    </button>

                    <button
                        type="button"
                        className="flex h-[20px] w-[20px] items-center justify-center"
                    >
                        <Image
                            src="/icons/kanban.png"
                            alt="Kanban view"
                            width={16}
                            height={16}
                        />
                    </button>
                </div>
            </div>

            <div className="overflow-hidden px-[8px]">
                <div className="h-[583px] w-[1050px] rounded-[10px] bg-[#EAEAEAA3] p-[6px]">
                    <div className="flex h-full gap-[10px]">
                        <div className="flex gap-[10px] overflow-x-auto overflow-y-hidden pr-[2px]">
                            {PRIMARY_COLUMNS.map((statusKey) => {
                                const status = getStatusMeta(statusKey);
                                const items = getCandidatesByStatus(statusKey);

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

                        <div className="flex w-[200px] shrink-0 flex-col gap-[10px]">
                            {STACKED_COLUMNS.map((statusKey) => {
                                const status = getStatusMeta(statusKey);
                                const items = getCandidatesByStatus(statusKey);

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
                </div>
            </div>
        </main>
    );
}