export function setSpeed(x, z) {
  if (z > 0   && x === 0) return 2.25
  if (z < 0   && x === 0) return 2.5
  if (z === 0 && x !== 0) return 2
  if (z !== 0 && x !== 0) return 2.25
  return 0
}

export function setAnimationHelper(x, z, current) {
  if ((x !== 0 || z !== 0) && current !== "Walk")
    return "Walk"
  if ((x === 0 && z === 0) && current !== "Idle")
    return "Idle"
  return null
} 