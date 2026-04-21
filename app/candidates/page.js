import { Suspense } from "react";
import CandidatesPageClient from "./CandidatesPageClient";

export default function CandidatesPage() {
    return (
        <Suspense fallback={<div className="h-screen bg-background" />}>
            <CandidatesPageClient />
        </Suspense>
    );
}