"use client";

import { useMemo, useState } from "react";
import AppSidebar from "@/app/components/layout/AppSidebar";
import AppTopbar from "@/app/components/layout/AppTopbar";
import CandidatesBoard from "@/app/components/recruitment/CandidatesBoard";
import CandidateInsightPanel from "@/app/components/recruitment/CandidateInsightPanel";
import { mockCandidates } from "@/lib/mocks/candidates";

export default function CandidatesPage() {
    const [selectedCandidateId, setSelectedCandidateId] = useState(null);
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const selectedCandidate = useMemo(() => {
        if (!selectedCandidateId) return null;

        return (
            mockCandidates.find((candidate) => candidate.id === selectedCandidateId) ||
            null
        );
    }, [selectedCandidateId]);

    const handleSelectCandidate = (candidateId) => {
        setSelectedCandidateId(candidateId);
        setIsPanelOpen(true);
    };

    const handleClosePanel = () => {
        setIsPanelOpen(false);
    };

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
                            onSelectCandidate={handleSelectCandidate}
                            isPanelOpen={isPanelOpen}
                        />
                    </div>

                    {isPanelOpen && selectedCandidate ? (
                        <CandidateInsightPanel
                            candidate={selectedCandidate}
                            onClose={handleClosePanel}
                        />
                    ) : null}
                </div>
            </div>
        </div>
    );
}