import { apiFetch } from './api'

export const getCandidates = (params = {}) => {
    const searchParams = new URLSearchParams()

    if (params.search) {
        searchParams.set('search', params.search)
    }

    if (params.position) {
        searchParams.set('position', params.position)
    }

    if (params.statuses?.length) {
        params.statuses.forEach((status) => {
            if (status === 'INTERVIEW_TEST') {
                searchParams.append('status', 'INTERVIEW')
                searchParams.append('status', 'TEST_TASK')
            } else {
                searchParams.append('status', status)
            }
        })
    }

    const query = searchParams.toString()

    return apiFetch(`/candidates${query ? `?${query}` : ''}`, {
        method: 'GET',
    })
}

export const getCandidateById = (id) =>
    apiFetch(`/candidates/${id}`, { method: 'GET' })

export const createCandidate = (data) =>
    apiFetch('/candidates', {
        method: 'POST',
        body: JSON.stringify(data),
    })

export const updateCandidate = (id, data) =>
    apiFetch(`/candidates/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    })

export const updateCandidateStatus = (id, status) =>
    apiFetch(`/candidates/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
    })

export const deleteCandidate = (id) =>
    apiFetch(`/candidates/${id}`, { method: 'DELETE' })

export const analyzeCandidateMatch = (candidateId, vacancyId) =>
    apiFetch(`/ai/match-candidate/candidate/${candidateId}/vacancy/${vacancyId}`, {
        method: 'POST',
    })