"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import AppSidebar from "@/app/components/layout/AppSidebar";
import AppTopbar from "@/app/components/layout/AppTopbar";
import CandidatesBoard from "@/app/components/recruitment/CandidatesBoard";
import CandidateInsightPanel from "@/app/components/recruitment/CandidateInsightPanel";
import DeleteCandidateModal from "@/app/components/ui/DeleteCandidateModal";
import { mockCandidates } from "@/lib/mocks/candidates";

export default function CandidatesPage() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [candidates, setCandidates] = useState(mockCandidates);
    const [selectedCandidateId, setSelectedCandidateId] = useState(null);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [viewMode, setViewMode] = useState("kanban");
    const [candidateToDelete, setCandidateToDelete] = useState(null);

    const [searchInput, setSearchInput] = useState(searchParams.get("search") || "");
    const [debouncedSearch, setDebouncedSearch] = useState(searchParams.get("search") || "");

    const selectedStatuses = searchParams.getAll("status");
    const selectedPosition = searchParams.get("position") || "";

    useEffect(() => {
        const timeout = setTimeout(() => {
            const nextSearch = searchInput.trim();
            setDebouncedSearch(nextSearch);

            const params = new URLSearchParams(searchParams.toString());

            if (nextSearch.length >= 2) {
                params.set("search", nextSearch);
            } else {
                params.delete("search");
            }

            router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        }, 300);

        return () => clearTimeout(timeout);
    }, [searchInput, pathname, router, searchParams]);

    const positionOptions = useMemo(() => {
        const uniquePositions = [...new Set(candidates.map((candidate) => candidate.position))];

        return uniquePositions.map((position) => ({
            label: position,
            value: position,
        }));
    }, [candidates]);

    const filteredCandidates = useMemo(() => {
        const normalizedSearch = debouncedSearch.toLowerCase();

        return candidates.filter((candidate) => {
            const name = candidate.fullName?.toLowerCase() || "";
            const email = candidate.email?.toLowerCase() || "";

            const matchesSearch =
                !normalizedSearch ||
                normalizedSearch.length < 2 ||
                name.includes(normalizedSearch) ||
                email.includes(normalizedSearch);

            const matchesStatus =
                selectedStatuses.length === 0 ||
                selectedStatuses.includes(candidate.status) ||
                (selectedStatuses.includes("INTERVIEW_TEST") &&
                    (candidate.status === "INTERVIEW" || candidate.status === "TEST_TASK"));

            const matchesPosition =
                !selectedPosition || candidate.position === selectedPosition;

            return matchesSearch && matchesStatus && matchesPosition;
        });
    }, [candidates, debouncedSearch, selectedStatuses, selectedPosition]);

    const selectedCandidate = useMemo(() => {
        if (!selectedCandidateId) return null;

        return (
            filteredCandidates.find((candidate) => candidate.id === selectedCandidateId) ||
            candidates.find((candidate) => candidate.id === selectedCandidateId) ||
            null
        );
    }, [selectedCandidateId, filteredCandidates, candidates]);

    const updateFiltersInUrl = ({ statuses = selectedStatuses, position = selectedPosition }) => {
        const params = new URLSearchParams(searchParams.toString());

        params.delete("status");
        statuses.forEach((status) => params.append("status", status));

        if (position) {
            params.set("position", position);
        } else {
            params.delete("position");
        }

        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const handleStatusChange = (nextStatuses) => {
        updateFiltersInUrl({ statuses: nextStatuses });
    };

    const handlePositionChange = (nextPosition) => {
        updateFiltersInUrl({ position: nextPosition });
    };

    const handleResetFilters = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("status");
        params.delete("position");
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

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
                            selectedStatuses={selectedStatuses}
                            selectedPosition={selectedPosition}
                            onStatusChange={handleStatusChange}
                            onPositionChange={handlePositionChange}
                            onResetFilters={handleResetFilters}
                            positionOptions={positionOptions}
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