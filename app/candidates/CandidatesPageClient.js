"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import AppSidebar from "@/app/components/layout/AppSidebar";
import AppTopbar from "@/app/components/layout/AppTopbar";
import CandidatesBoard from "@/app/components/recruitment/CandidatesBoard";
import CandidateInsightPanel from "@/app/components/recruitment/CandidateInsightPanel";
import DeleteCandidateModal from "@/app/components/ui/DeleteCandidateModal";
import CandidateForm from "@/app/components/candidates/CandidateForm";
import {
    getCandidates,
    deleteCandidate,
    updateCandidateStatus,
} from "@/lib/candidates";
import { mapApiCandidateToUi } from "@/lib/mappers/candidateMapper";
import { mapColumnKeyToStatus } from "@/lib/utils/candidate-status";

export default function CandidatesPageClient() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const searchParamsString = searchParams.toString();

    const selectedStatuses = useMemo(
        () => searchParams.getAll("status"),
        [searchParamsString]
    );

    const selectedPosition = useMemo(
        () => searchParams.get("position") || "",
        [searchParamsString]
    );

    const currentSearchParam = useMemo(
        () => searchParams.get("search") || "",
        [searchParamsString]
    );

    const [candidates, setCandidates] = useState([]);
    const [isLoadingCandidates, setIsLoadingCandidates] = useState(true);
    const [candidatesError, setCandidatesError] = useState("");

    const [selectedCandidateId, setSelectedCandidateId] = useState(null);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [viewMode, setViewMode] = useState("kanban");
    const [candidateToDelete, setCandidateToDelete] = useState(null);
    const [pendingCandidateIds, setPendingCandidateIds] = useState([]);
    const [isCandidateFormOpen, setIsCandidateFormOpen] = useState(false);

    const [searchInput, setSearchInput] = useState(currentSearchParam);
    const [debouncedSearch, setDebouncedSearch] = useState(currentSearchParam);

    useEffect(() => {
        setSearchInput(currentSearchParam);
        setDebouncedSearch(currentSearchParam);
    }, [currentSearchParam]);

    const loadCandidates = async ({
                                      search = debouncedSearch,
                                      position = selectedPosition,
                                      statuses = selectedStatuses,
                                  } = {}) => {
        try {
            setIsLoadingCandidates(true);
            setCandidatesError("");

            const response = await getCandidates({
                search: search.length >= 2 ? search : "",
                position,
                statuses,
            });

            const list = Array.isArray(response?.data) ? response.data : [];
            const mappedCandidates = list.map(mapApiCandidateToUi);

            setCandidates(mappedCandidates);
        } catch (error) {
            setCandidates([]);
            setCandidatesError(error.message || "Failed to load candidates");
        } finally {
            setIsLoadingCandidates(false);
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            const nextSearch = searchInput.trim();
            setDebouncedSearch(nextSearch);

            const params = new URLSearchParams(searchParamsString);
            const existingSearch = params.get("search") || "";

            if (nextSearch.length >= 2) {
                if (existingSearch !== nextSearch) {
                    params.set("search", nextSearch);
                    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
                }
            } else if (existingSearch) {
                params.delete("search");
                const nextUrl = params.toString()
                    ? `${pathname}?${params.toString()}`
                    : pathname;

                router.replace(nextUrl, { scroll: false });
            }
        }, 300);

        return () => clearTimeout(timeout);
    }, [searchInput, pathname, router, searchParamsString]);

    useEffect(() => {
        let cancelled = false;

        async function fetchCandidates() {
            try {
                setIsLoadingCandidates(true);
                setCandidatesError("");

                const response = await getCandidates({
                    search: debouncedSearch.length >= 2 ? debouncedSearch : "",
                    position: selectedPosition,
                    statuses: selectedStatuses,
                });

                const list = Array.isArray(response?.data) ? response.data : [];
                const mappedCandidates = list.map(mapApiCandidateToUi);

                if (!cancelled) {
                    setCandidates(mappedCandidates);
                }
            } catch (error) {
                if (!cancelled) {
                    setCandidates([]);
                    setCandidatesError(error.message || "Failed to load candidates");
                }
            } finally {
                if (!cancelled) {
                    setIsLoadingCandidates(false);
                }
            }
        }

        fetchCandidates();

        return () => {
            cancelled = true;
        };
    }, [debouncedSearch, selectedPosition, selectedStatuses]);

    const positionOptions = useMemo(() => {
        const uniquePositions = [
            ...new Set(
                candidates.map((candidate) => candidate.position).filter(Boolean)
            ),
        ];

        return uniquePositions.map((position) => ({
            label: position,
            value: position,
        }));
    }, [candidates]);

    const selectedCandidate = useMemo(() => {
        if (!selectedCandidateId) return null;

        return (
            candidates.find((candidate) => candidate.id === selectedCandidateId) ||
            null
        );
    }, [selectedCandidateId, candidates]);

    const updateFiltersInUrl = ({
                                    statuses = selectedStatuses,
                                    position = selectedPosition,
                                }) => {
        const params = new URLSearchParams(searchParamsString);

        params.delete("status");
        statuses.forEach((status) => params.append("status", status));

        if (position) {
            params.set("position", position);
        } else {
            params.delete("position");
        }

        const nextUrl = params.toString()
            ? `${pathname}?${params.toString()}`
            : pathname;

        router.replace(nextUrl, { scroll: false });
    };

    const handleStatusChange = (nextStatuses) => {
        updateFiltersInUrl({ statuses: nextStatuses });
    };

    const handlePositionChange = (nextPosition) => {
        updateFiltersInUrl({ position: nextPosition });
    };

    const handleResetFilters = () => {
        const params = new URLSearchParams(searchParamsString);
        params.delete("status");
        params.delete("position");

        const nextUrl = params.toString()
            ? `${pathname}?${params.toString()}`
            : pathname;

        router.replace(nextUrl, { scroll: false });
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

    const handleConfirmDelete = async () => {
        if (!candidateToDelete) return;

        const deletedId = candidateToDelete.id;
        const previousCandidates = candidates;

        setCandidates((prev) =>
            prev.filter((candidate) => candidate.id !== deletedId)
        );

        if (selectedCandidateId === deletedId) {
            setSelectedCandidateId(null);
            setIsPanelOpen(false);
        }

        setCandidateToDelete(null);

        try {
            await deleteCandidate(deletedId);
        } catch (error) {
            setCandidates(previousCandidates);
            console.error("Failed to delete candidate:", error);
        }
    };

    const handleMoveCandidate = async ({ candidateId, targetColumnKey }) => {
        const nextStatus = mapColumnKeyToStatus(targetColumnKey);

        const previousCandidates = candidates;
        const currentCandidate = candidates.find(
            (candidate) => candidate.id === candidateId
        );

        if (!currentCandidate) return;
        if (currentCandidate.status === nextStatus) return;

        setPendingCandidateIds((prev) => [...prev, candidateId]);

        setCandidates((prev) =>
            prev.map((candidate) =>
                candidate.id === candidateId
                    ? { ...candidate, status: nextStatus }
                    : candidate
            )
        );

        try {
            await updateCandidateStatus(candidateId, nextStatus);
        } catch (error) {
            setCandidates(previousCandidates);
            console.error("Failed to update candidate status:", error);
        } finally {
            setPendingCandidateIds((prev) =>
                prev.filter((id) => id !== candidateId)
            );
        }
    };

    const handleOpenCandidateForm = () => {
        setIsCandidateFormOpen(true);
    };

    const handleCloseCandidateForm = async (shouldRefresh = false) => {
        setIsCandidateFormOpen(false);

        if (shouldRefresh) {
            await loadCandidates();
        }
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
                        {isLoadingCandidates ? (
                            <div className="flex flex-1 items-center justify-center bg-background text-black/45">
                                Loading candidates...
                            </div>
                        ) : candidatesError ? (
                            <div className="flex flex-1 items-center justify-center bg-background text-red-500">
                                {candidatesError}
                            </div>
                        ) : (
                            <CandidatesBoard
                                candidates={candidates}
                                selectedCandidateId={selectedCandidateId}
                                onSelectCandidate={handleSelectCandidate}
                                onDeleteCandidate={handleAskDeleteCandidate}
                                onMoveCandidate={handleMoveCandidate}
                                onAddCandidate={handleOpenCandidateForm}
                                pendingCandidateIds={pendingCandidateIds}
                                isPanelOpen={isPanelOpen}
                                viewMode={viewMode}
                                onChangeViewMode={setViewMode}
                                isSearchActive={debouncedSearch.length >= 2}
                                selectedStatuses={selectedStatuses}
                                selectedPosition={selectedPosition}
                                onStatusChange={handleStatusChange}
                                onPositionChange={handlePositionChange}
                                onResetFilters={handleResetFilters}
                                positionOptions={positionOptions}
                            />
                        )}
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

            {isCandidateFormOpen ? (
                <CandidateForm onClose={handleCloseCandidateForm} />
            ) : null}
        </div>
    );
}