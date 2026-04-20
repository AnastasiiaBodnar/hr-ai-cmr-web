const BASE_URL = '/api/v1'

export async function apiFetch(path, options = {}) {
  const { body, headers, ...restOptions } = options;

  const finalHeaders = {
    ...headers,
    'credentials': 'include'
  };

  if (body) {
    finalHeaders['Content-Type'] = 'application/json';
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    headers: finalHeaders,
    credentials: 'include',
    body,
    ...restOptions,
  })

  console.log(`[API ${options.method || 'GET'}] ${BASE_URL}${path}`, { headers: finalHeaders, body });

  if (!res.ok) {
    const error = await res.json().catch(() => null)
    console.error('[API ERROR RESPONSE]', error);
    const message = getDefaultError(res.status, error?.message || error?.error || error?.details)
    throw new Error(message)
  }

  if (res.status === 204) {
    return null
  }

  return res.json()
}

function getDefaultError(status, serverMessage) {
  if (serverMessage === 'Invalid credentials') return 'Invalid email or password'
  if (serverMessage === 'Email already taken') return 'This email is already taken'
  if (serverMessage === 'User not found') return 'User not found'

  if (serverMessage && typeof serverMessage === 'string') {
    return serverMessage;
  }

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