package com.haptics

data class HapticsVibrationType(
  val timings: LongArray,
  val amplitudes: IntArray,
  val oldFallback: LongArray
) {
  override fun equals(other: Any?): Boolean {
    if (this === other) return true
    if (javaClass != other?.javaClass) return false
    other as HapticsVibrationType
    if (!timings.contentEquals(other.timings)) return false
    if (!amplitudes.contentEquals(other.amplitudes)) return false
    if (!oldFallback.contentEquals(other.oldFallback)) return false
    return true
  }

  override fun hashCode(): Int {
    var result = timings.contentHashCode()
    result = 31 * result + amplitudes.contentHashCode()
    result = 31 * result + oldFallback.contentHashCode()
    return result
  }
}