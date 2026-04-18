"use client";

import { useMemo, useState } from "react";
import AppSidebar from "@/app/components/layout/AppSidebar";
import AppTopbar from "@/app/components/layout/AppTopbar";
import CandidatesBoard from "@/app/components/recruitment/CandidatesBoard";
import CandidateInsightPanel from "@/app/components/recruitment/CandidateInsightPanel";
import DeleteCandidateModal from "@/app/components/ui/DeleteCandidateModal";
import { mockCandidates } from "@/lib/mocks/candidates";

export default function CandidatesPage() {
    const [candidates, setCandidates] = useState(mockCandidates);
    const [selectedCandidateId, setSelectedCandidateId] = useState(null);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [viewMode, setViewMode] = useState("kanban");
    const [candidateToDelete, setCandidateToDelete] = useState(null);

    const selectedCandidate = useMemo(() => {
        if (!selectedCandidateId) return null;

        return candidates.find((candidate) => candidate.id === selectedCandidateId) || null;
    }, [selectedCandidateId, candidates]);

    const handleSelectCandidate = (candidateId) => {
        setSelectedCandidateId(candidateId);
        setIsPanelOpen(true);
    };

    const handleClosePanel = () => {
        setIsPanelOpen(false);
    };

    const handleAskDeleteCandidate = (candidate) => {
        setCandidateToDelete(candidate);
    };

    const handleCancelDelete = () => {
        setCandidateToDelete(null);
    };

    const handleConfirmDelete = () => {
        if (!candidateToDelete) return;

        setCandidates((prev) =>
            prev.filter((candidate) => candidate.id !== candidateToDelete.id)
        );

        if (selectedCandidateId === candidateToDelete.id) {
            setSelectedCandidateId(null);
            setIsPanelOpen(false);
        }

        setCandidateToDelete(null);
    };

    return (
        <div className="flex h-screen overflow-hidden bg-background">
            <AppSidebar />

            <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
                <AppTopbar />

                <div className="flex min-h-0 flex-1 overflow-hidden">
                    <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
                        <CandidatesBoard
                            candidates={candidates}
                            selectedCandidateId={selectedCandidateId}
                            onSelectCandidate={handleSelectCandidate}
                            onDeleteCandidate={handleAskDeleteCandidate}
                            isPanelOpen={isPanelOpen}
                            viewMode={viewMode}
                            onChangeViewMode={setViewMode}
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

            <DeleteCandidateModal
                isOpen={Boolean(candidateToDelete)}
                candidateName={candidateToDelete?.fullName}
                onCancel={handleCancelDelete}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
}