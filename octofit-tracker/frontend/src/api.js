const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function resourceUrl(resource) {
  return `${API_BASE_URL}/api/${resource}/`
}

export async function fetchCollection(resource, signal) {
  const response = await fetch(resourceUrl(resource), { signal })
  if (!response.ok) throw new Error(`Unable to load ${resource} (${response.status})`)
  const payload = await response.json()
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload.results)) return payload.results
  if (Array.isArray(payload.items)) return payload.items
  if (Array.isArray(payload.data)) return payload.data
  return []
}