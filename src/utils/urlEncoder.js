// Encode entire bill state into a URL-safe string
export function encodeState(state) {
  const json = JSON.stringify(state)
  return btoa(encodeURIComponent(json))
}

// Decode URL string back into bill state
export function decodeState(encoded) {
  try {
    const json = decodeURIComponent(atob(encoded))
    return JSON.parse(json)
  } catch {
    return null
  }
}