"use client";

import { useMemo, useState } from "react";
import AppSidebar from "@/app/components/layout/AppSidebar";
import AppTopbar from "@/app/components/layout/AppTopbar";
import CandidatesBoard from "@/app/components/recruitment/CandidatesBoard";
import CandidateInsightPanel from "@/app/components/recruitment/CandidateInsightPanel";
import { mockCandidates } from "@/lib/mocks/candidates";

export default function CandidatesPage() {
    const [selectedCandidateId, setSelectedCandidateId] = useState("2");

    const selectedCandidate = useMemo(() => {
        return (
            mockCandidates.find((candidate) => candidate.id === selectedCandidateId) ||
            mockCandidates[0]
        );
    }, [selectedCandidateId]);

    return (
        <div className="flex h-screen overflow-hidden bg-background">
            <AppSidebar />

            <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
                <AppTopbar />

                <div className="flex min-h-0 flex-1 overflow-hidden">
                    <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
                        <CandidatesBoard
                            candidates={mockCandidates}
                            selectedCandidateId={selectedCandidateId}
                            onSelectCandidate={setSelectedCandidateId}
                        />
                    </div>

                    <CandidateInsightPanel candidate={selectedCandidate} />
                </div>
            </div>
        </div>
    );
}