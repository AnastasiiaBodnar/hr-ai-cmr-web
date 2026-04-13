const BASE_URL = '/api/v1'

export async function apiFetch(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    ...options,
  })

  if (!res.ok) {
    const error = await res.json().catch(() => null)
    const message = getDefaultError(res.status, error?.message)
    throw new Error(message)
  }

  return res.json()
}

function getDefaultError(status, serverMessage) {
  if (serverMessage === 'Invalid credentials') return 'Invalid email or password'
  if (serverMessage === 'Email already taken') return 'This email is already taken'
  if (serverMessage === 'User not found') return 'User not found'

  switch (status) {
    case 400: return 'Invalid data'
    case 401: return 'Invalid email or password'
    case 403: return 'Access denied'
    case 404: return 'Not found'
    case 409: return 'This email is already taken'
    case 500: return 'Server error, please try again later'
    default: return 'Something went wrong'
  }
}