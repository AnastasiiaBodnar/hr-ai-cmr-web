"use client";

import { useEffect, useMemo, useState } from "react";
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

    const [searchInput, setSearchInput] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedSearch(searchInput.trim());
        }, 300);

        return () => clearTimeout(timeout);
    }, [searchInput]);

    const filteredCandidates = useMemo(() => {
        const normalizedSearch = debouncedSearch.toLowerCase();

        if (!normalizedSearch || normalizedSearch.length < 2) {
            return candidates;
        }

        return candidates.filter((candidate) => {
            const name = candidate.fullName?.toLowerCase() || "";
            const email = candidate.email?.toLowerCase() || "";

            return (
                name.includes(normalizedSearch) || email.includes(normalizedSearch)
            );
        });
    }, [candidates, debouncedSearch]);

    const selectedCandidate = useMemo(() => {
        if (!selectedCandidateId) return null;

        return (
            filteredCandidates.find((candidate) => candidate.id === selectedCandidateId) ||
            candidates.find((candidate) => candidate.id === selectedCandidateId) ||
            null
        );
    }, [selectedCandidateId, filteredCandidates, candidates]);

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
                <AppTopbar
                    searchValue={searchInput}
                    onSearchChange={setSearchInput}
                />

                <div className="flex min-h-0 flex-1 overflow-hidden">
                    <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
                        <CandidatesBoard
                            candidates={filteredCandidates}
                            selectedCandidateId={selectedCandidateId}
                            onSelectCandidate={handleSelectCandidate}
                            onDeleteCandidate={handleAskDeleteCandidate}
                            isPanelOpen={isPanelOpen}
                            viewMode={viewMode}
                            onChangeViewMode={setViewMode}
                            searchValue={debouncedSearch}
                            isSearchActive={debouncedSearch.length >= 2}
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