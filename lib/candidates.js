import { apiFetch } from './api'

export const getCandidates = () => 
  apiFetch('/candidates', { method: 'GET' })

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
