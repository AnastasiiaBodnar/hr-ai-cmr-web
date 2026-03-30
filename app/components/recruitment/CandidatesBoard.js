export default function CandidatesBoard() {
    return (
        <main className="flex-1 bg-background px-6 py-7">
            <div className="mb-8 flex items-end gap-4">
                <h1 className="text-[32px] font-bold leading-none text-black">
                    AI CRM Candidates
                </h1>
                <span className="text-[32px] leading-none text-black">|</span>
                <h2 className="text-2xl font-semibold leading-none text-black">
                    Recruitment panel
                </h2>
            </div>

            <div className="rounded-2xl bg-transparent">
                <div className="flex min-h-[583px] items-center justify-center rounded-2xl border border-transparent bg-transparent text-lg text-black/50">
                    Kanban board area
                </div>
            </div>
        </main>
    );
}