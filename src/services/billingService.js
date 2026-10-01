const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'

async function request(path, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options,
    })
    if (!response.ok) {
      const error = new Error('The server returned an error.')
      error.code = 'request_failed'
      throw error
    }
    return response.status === 204 ? null : response.json()
  } catch (error) {
    if (error.code) throw error
    const connectionError = new Error('Unable to connect to the server. Please try again.')
    connectionError.code = 'server_unavailable'
    throw connectionError
  }
}

export async function calculateBill(data) {
  return request('/bills/', { method: 'POST', body: JSON.stringify(data) })
}

export function getBills() { return request('/bills/') }
export function getBill(id) { return request(`/bills/${id}/`) }
export function deleteBill(id) { return request(`/bills/${id}/`, { method: 'DELETE' }) }
