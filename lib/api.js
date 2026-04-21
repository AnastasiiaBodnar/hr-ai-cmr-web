const BASE_URL = '/api/v1'

function getAccessToken() {
  if (typeof document === 'undefined') return ''

  const match = document.cookie.match(/(?:^|; )access_token=([^;]+)/)
  return match ? decodeURIComponent(match[1]) : ''
}

export async function apiFetch(path, options = {}) {
  const token = getAccessToken()

  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    credentials: 'include',
    ...options,
  })

  if (!res.ok) {
    let error = null

    try {
      error = await res.json()
    } catch {
      try {
        const text = await res.text()
        error = text ? { message: text } : null
      } catch {
        error = null
      }
    }

    const message = getDefaultError(res.status, error?.message)
    throw new Error(message)
  }

  if (res.status === 204) {
    return null
  }

  const contentType = res.headers.get('content-type') || ''
  if (!contentType.includes('application/json')) {
    return null
  }

  const text = await res.text()
  if (!text) {
    return null
  }

  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}

function getDefaultError(status, serverMessage) {
  if (serverMessage === 'Invalid credentials') return 'Invalid email or password'
  if (serverMessage === 'Email already taken') return 'Candidate with this email already exists'
  if (serverMessage === 'User not found') return 'User not found'

  if (serverMessage && typeof serverMessage === 'string') {
    return serverMessage
  }

  switch (status) {
    case 400:
      return 'Invalid data'
    case 401:
      return 'Unauthorized'
    case 403:
      return 'Access denied'
    case 404:
      return 'Not found'
    case 409:
      return 'Candidate with this email already exists'
    case 500:
      return 'Server error, please try again later'
    default:
      return 'Something went wrong'
  }
}