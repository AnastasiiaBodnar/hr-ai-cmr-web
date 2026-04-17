import { apiFetch } from './api'

export const login = (email, password) =>
  apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })

export const register = async (name, email, password) => {
  return apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  })
}

export const logout = () =>
  apiFetch('/auth/logout', { method: 'POST' })

export const verifyEmail = async (email, token) => {
  try {
    await apiFetch('/auth/verify-email', {
      method: 'POST',
      body: JSON.stringify({ email, token }),
    })
    return true
  } catch (error) {
    return false
  }
}