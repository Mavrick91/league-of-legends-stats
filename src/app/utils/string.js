export function capitalize(str, transform = false) {
  if (!str) return null
  let finalStr = str

  if (transform) finalStr = str.toLowerCase()

  return finalStr.substr(0, 1).toUpperCase() + finalStr.substr(1)
}
