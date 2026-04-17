"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import CandidateColumn from "./CandidateColumn";
import { CANDIDATE_STATUSES } from "@/lib/constants/candidate-statuses";

const PRIMARY_COLUMNS = ["NEW", "SCREENING", "INTERVIEW", "OFFER"];
const STACKED_COLUMNS = ["HIRED", "REJECTED"];

export default function CandidatesBoard({
                                            candidates,
                                            selectedCandidateId,
                                            onSelectCandidate,
                                            isPanelOpen,
                                        }) {
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        const updateWidth = () => setWindowWidth(window.innerWidth);
        updateWidth();
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    const desktopGridBreakpoint = isPanelOpen ? 1660 : 1420;
    const shouldUseDesktopGrid = windowWidth >= desktopGridBreakpoint;

    const getCandidatesByStatus = (statusKey) =>
        candidates.filter((candidate) => candidate.status === statusKey);

    const getStatusMeta = (statusKey) =>
        CANDIDATE_STATUSES.find((status) => status.key === statusKey);

    return (
        <main className="flex min-h-0 flex-1 flex-col bg-background px-4 py-4 xl:px-5 xl:py-5 2xl:px-6">
            <div className="mb-4 flex items-end gap-4">
                <h1 className="text-[32px] font-bold leading-none text-black">
                    AI CRM Candidates
                </h1>
                <span className="text-[30px] leading-none text-black">|</span>
                <h2 className="text-[24px] font-semibold leading-none text-black">
                    Recruitment panel
                </h2>
            </div>

            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="text-[16px] font-normal text-black">Filter by</span>

                    <button className="flex h-[30px] items-center gap-1 rounded-[4px] border border-black/15 bg-white px-3 text-[13px] text-black/50">
                        <span>Position</span>
                        <Image src="/icons/arrow.png" alt="Open position filter" width={10} height={10} />
                    </button>

                    <button className="flex h-[30px] items-center gap-1 rounded-[4px] border border-black/15 bg-white px-3 text-[13px] text-black/50">
                        <span>Status</span>
                        <Image src="/icons/arrow.png" alt="Open status filter" width={10} height={10} />
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <button className="h-[28px] rounded-[4px] bg-primary px-4 text-[13px] font-normal text-white">
                        Add candidates +
                    </button>

                    <button type="button" className="flex h-[20px] w-[20px] items-center justify-center">
                        <Image src="/icons/list.png" alt="List view" width={16} height={16} />
                    </button>

                    <button type="button" className="flex h-[20px] w-[20px] items-center justify-center">
                        <Image src="/icons/kanban.png" alt="Kanban view" width={16} height={16} />
                    </button>
                </div>
            </div>

            <div className="min-h-0 flex-1">
                <div className="h-full rounded-[16px] bg-[#EAEAEAA3] p-[8px] xl:p-[10px]">
                    {!shouldUseDesktopGrid ? (
                        <div className="h-full overflow-x-auto overflow-y-hidden">
                            <div
                                className={`flex h-full gap-[10px] ${
                                    isPanelOpen ? "min-w-[980px]" : "min-w-[1120px]"
                                }`}
                            >
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
                                            isPanelOpen={isPanelOpen}
                                            compactMode={isPanelOpen}
                                        />
                                    );
                                })}

                                <div className={`${isPanelOpen ? "w-[220px]" : "w-[250px]"} flex shrink-0 flex-col gap-[10px]`}>
                                    <div className="rounded-[14px] bg-white px-4 py-4">
                                        <h3 className="truncate text-[22px] font-semibold leading-none text-black">
                                            Final Results
                                        </h3>
                                    </div>

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
                                                compact
                                                wide
                                                isPanelOpen={isPanelOpen}
                                                compactMode={isPanelOpen}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div
                            className={`grid h-full gap-[12px] ${
                                isPanelOpen
                                    ? "grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_220px]"
                                    : "grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_260px]"
                            }`}
                        >
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
                                        isPanelOpen={isPanelOpen}
                                        fluid
                                        compactMode={isPanelOpen}
                                    />
                                );
                            })}

                            <div className="flex min-h-0 flex-col gap-[12px]">
                                <div className="rounded-[14px] bg-white px-4 py-4">
                                    <h3 className="truncate text-[22px] font-semibold leading-none text-black">
                                        Final Results
                                    </h3>
                                </div>

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
                                            compact
                                            wide
                                            isPanelOpen={isPanelOpen}
                                            fluid
                                            compactMode={isPanelOpen}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}