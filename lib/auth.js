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

export const requestPasswordReset = (email) =>
  apiFetch(`/auth/request-password-reset/${encodeURIComponent(email)}`, {
    method: 'POST',
  })

export const setPassword = ({ email, token, password }) => {
  const body = { token, password };
  if (email) body.email = email;
  
  return apiFetch('/auth/set-password', {
    method: 'POST',
    body: JSON.stringify(body),
  });
};