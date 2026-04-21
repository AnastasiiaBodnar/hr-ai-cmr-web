export function mapApiCandidateToUi(candidate) {
    return {
        id: String(candidate.id),
        fullName: candidate.name || "",
        email: candidate.email || "",
        phone: candidate.phone || "",
        linkedIn: candidate.linkedInUrl || "",
        position:
            candidate.position?.title ||
            candidate.positionTitle ||
            candidate.positionName ||
            "Unknown position",
        positionId: candidate.positionId || "",
        status: candidate.currentStatus || candidate.status || "NEW",
        createdAt: formatCreatedAt(candidate.createdAt),
        createdAtRaw: candidate.createdAt || "",
        avatar: "/icons/hr.icons.png",
        matchPercent: 95,
        level: candidate.level || "",
        salaryFrom: normalizeSalary(candidate.expectedSalary),
        expectedSalary: candidate.expectedSalary || "",
        experience: candidate.experience || "—",
        skills: Array.isArray(candidate.skills) ? candidate.skills : [],
        strongSkills: Array.isArray(candidate.skills) ? candidate.skills : [],
        missingSkills: Array.isArray(candidate.missingSkills)
            ? candidate.missingSkills
            : [],
        technicalMatch: 85,
        softSkillsMatch: 95,
        analyzeDate: candidate.createdAt
            ? formatAnalyzeDate(candidate.createdAt)
            : "",
        summary: candidate.comment || "",
        hrNotes: candidate.comment || "",
        cvUrl: candidate.cvUrl || "",
        resumeFiles: candidate.id
            ? [
                {
                    id: "cv-file",
                    type: getFileType(candidate.cvUrl),
                    fileName: extractFileName(candidate.cvUrl),
                    url: `/api/v1/candidates/${candidate.id}/cv`,
                },
            ]
            : [],
        timeline: [],
        raw: candidate,
    };
}

function normalizeSalary(value) {
    if (!value) return "";

    const stringValue = String(value).trim();
    if (!stringValue) return "";

    if (
        stringValue.toLowerCase().startsWith("from") ||
        stringValue.includes("$")
    ) {
        return stringValue;
    }

    return `from ${stringValue}`;
}

function formatCreatedAt(value) {
    if (!value) return "";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";

    const diffMs = Date.now() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return "today";
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 14) return "1 week ago";
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
}

function formatAnalyzeDate(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";

    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

function extractFileName(url) {
    if (!url) return "cv.pdf";

    try {
        const cleanUrl = String(url).split("?")[0];
        const fileName = cleanUrl.split("/").pop();
        return fileName || "cv.pdf";
    } catch {
        return "cv.pdf";
    }
}

function getFileType(url) {
    if (!url) return "pdf";

    const lower = String(url).toLowerCase();

    if (lower.endsWith(".doc") || lower.endsWith(".docx")) return "doc";
    return "pdf";
}