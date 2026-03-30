import Image from "next/image";

export default function CandidateCard({ candidate, isSelected, onSelect }) {
    return (
        <button
            type="button"
            onClick={() => onSelect(candidate.id)}
            className={`w-full rounded-[20px] border bg-white p-4 text-left transition ${
                isSelected
                    ? "border-secondary shadow-sm"
                    : "border-black/10 hover:border-black/20"
            }`}
        >
            <div className="mb-3 flex items-center gap-3">
                <Image
                    src={candidate.avatar}
                    alt={candidate.fullName}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                />

                <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-black">
                        {candidate.fullName}
                    </p>
                    <p className="truncate text-xs text-black/60">{candidate.email}</p>
                </div>
            </div>

            <div className="space-y-2">
                <div>
                    <p className="text-xs text-black/50">Position</p>
                    <p className="text-sm font-medium text-black">{candidate.position}</p>
                </div>

                <div>
                    <p className="text-xs text-black/50">Added</p>
                    <p className="text-sm text-black/80">{candidate.createdAt}</p>
                </div>
            </div>
        </button>
    );
}