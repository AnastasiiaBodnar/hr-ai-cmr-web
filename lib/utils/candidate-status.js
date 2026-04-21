export function mapColumnKeyToStatus(columnKey) {
    if (columnKey === "INTERVIEW_TEST") {
        return "INTERVIEW";
    }

    return columnKey;
}

export function mapCandidateStatusToColumnKey(status) {
    if (status === "INTERVIEW" || status === "TEST_TASK") {
        return "INTERVIEW_TEST";
    }

    return status;
}