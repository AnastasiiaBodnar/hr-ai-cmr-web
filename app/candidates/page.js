import AppSidebar from "@/app/components/layout/AppSidebar";
import AppTopbar from "@/app/components/layout/AppTopbar";
import CandidatesBoard from "@/app/components/recruitment/CandidatesBoard";
import CandidateInsightPanel from "@/app/components/recruitment/CandidateInsightPanel";

export default function CandidatesPage() {
    return (
        <div className="flex min-h-screen bg-background">
            <AppSidebar />

            <div className="flex min-w-0 flex-1">
                <div className="flex min-w-0 flex-1 flex-col">
                    <AppTopbar />
                    <CandidatesBoard />
                </div>

                <CandidateInsightPanel />
            </div>
        </div>
    );
}