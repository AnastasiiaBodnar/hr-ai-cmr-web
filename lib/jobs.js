import { apiFetch } from './api'

export const getJobs = () => 
  apiFetch('/vacancies', { method: 'GET' })

export const getJobById = (id) => 
  apiFetch(`/vacancies/${id}`, { method: 'GET' })

export const createJob = (data) =>
  apiFetch('/vacancies', {
    method: 'POST',
    body: JSON.stringify(data),
  })

export const updateJob = (id, data) =>
  apiFetch(`/vacancies/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })

export const deleteJob = (id) =>
  apiFetch(`/vacancies/${id}`, { method: 'DELETE' })
