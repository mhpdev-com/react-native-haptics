package com.haptics

import android.os.Build
import android.view.HapticFeedbackConstants

object HapticsUtils {
  private data class HapticInfo(val constant: Int, val requiredApi: Int)

  private val notificationTypes = mapOf(
    "success" to HapticsVibrationType(
      timings = longArrayOf(0, 40, 100, 50),
      amplitudes = intArrayOf(0, 140, 0, 200),
      oldFallback = longArrayOf(0, 40, 100, 50)
    ),
    "warning" to HapticsVibrationType(
      timings = longArrayOf(0, 45, 120, 60),
      amplitudes = intArrayOf(0, 180, 0, 255),
      oldFallback = longArrayOf(0, 45, 120, 60)
    ),
    "error" to HapticsVibrationType(
      timings = longArrayOf(0, 40, 70, 40, 70, 45),
      amplitudes = intArrayOf(0, 160, 0, 200, 0, 255),
      oldFallback = longArrayOf(0, 40, 70, 40, 70, 45)
    )
  )

  private val impactTypes = mapOf(
    "light" to HapticsVibrationType(
      timings = longArrayOf(0, 35),
      amplitudes = intArrayOf(0, 130),
      oldFallback = longArrayOf(0, 35)
    ),
    "soft" to HapticsVibrationType(
      timings = longArrayOf(0, 20, 0, 45),
      amplitudes = intArrayOf(0, 80, 0, 140),
      oldFallback = longArrayOf(0, 65)
    ),
    "medium" to HapticsVibrationType(
      timings = longArrayOf(0, 45),
      amplitudes = intArrayOf(0, 180),
      oldFallback = longArrayOf(0, 45)
    ),
    "rigid" to HapticsVibrationType(
      timings = longArrayOf(0, 35),
      amplitudes = intArrayOf(0, 240),
      oldFallback = longArrayOf(0, 35)
    ),
    "heavy" to HapticsVibrationType(
      timings = longArrayOf(0, 50, 0, 35),
      amplitudes = intArrayOf(0, 255, 0, 180),
      oldFallback = longArrayOf(0, 85)
    )
  )

  private val ALL_HAPTIC_TYPES = mapOf(
    "long-press" to HapticInfo(HapticFeedbackConstants.LONG_PRESS, 1),
    "clock-tick" to HapticInfo(HapticFeedbackConstants.CLOCK_TICK, 1),
    "virtual-key" to HapticInfo(HapticFeedbackConstants.VIRTUAL_KEY, 1),
    "keyboard-tap" to HapticInfo(HapticFeedbackConstants.KEYBOARD_TAP, 1),
    "reject" to HapticInfo(HapticFeedbackConstants.REJECT, Build.VERSION_CODES.R),
    "confirm" to HapticInfo(HapticFeedbackConstants.CONFIRM, Build.VERSION_CODES.R),
    "gesture-end" to HapticInfo(HapticFeedbackConstants.GESTURE_END, Build.VERSION_CODES.R),
    "gesture-start" to HapticInfo(HapticFeedbackConstants.GESTURE_START, Build.VERSION_CODES.R),
    "context-click" to HapticInfo(HapticFeedbackConstants.CONTEXT_CLICK, Build.VERSION_CODES.M),
    "keyboard-press" to HapticInfo(HapticFeedbackConstants.KEYBOARD_PRESS, Build.VERSION_CODES.O_MR1),
    "toggle-on" to HapticInfo(HapticFeedbackConstants.TOGGLE_ON, Build.VERSION_CODES.UPSIDE_DOWN_CAKE),
    "toggle-off" to HapticInfo(HapticFeedbackConstants.TOGGLE_OFF, Build.VERSION_CODES.UPSIDE_DOWN_CAKE),
    "drag-start" to HapticInfo(HapticFeedbackConstants.DRAG_START, Build.VERSION_CODES.UPSIDE_DOWN_CAKE),
    "keyboard-release" to HapticInfo(HapticFeedbackConstants.KEYBOARD_RELEASE, Build.VERSION_CODES.O_MR1),
    "text-handle-move" to HapticInfo(HapticFeedbackConstants.TEXT_HANDLE_MOVE, Build.VERSION_CODES.O_MR1),
    "no-haptics" to HapticInfo(HapticFeedbackConstants.NO_HAPTICS, Build.VERSION_CODES.UPSIDE_DOWN_CAKE),
    "segment-tick" to HapticInfo(HapticFeedbackConstants.SEGMENT_TICK, Build.VERSION_CODES.UPSIDE_DOWN_CAKE),
    "virtual-key-release" to HapticInfo(HapticFeedbackConstants.VIRTUAL_KEY_RELEASE, Build.VERSION_CODES.O_MR1),
    "segment-frequent-tick" to HapticInfo(HapticFeedbackConstants.SEGMENT_FREQUENT_TICK, Build.VERSION_CODES.UPSIDE_DOWN_CAKE),
    "gesture-threshold-activate" to HapticInfo(HapticFeedbackConstants.GESTURE_THRESHOLD_ACTIVATE, Build.VERSION_CODES.UPSIDE_DOWN_CAKE),
    "gesture-threshold-deactivate" to HapticInfo(HapticFeedbackConstants.GESTURE_THRESHOLD_DEACTIVATE, Build.VERSION_CODES.UPSIDE_DOWN_CAKE)
  )

  fun getNotificationType(type: String): HapticsVibrationType =
    notificationTypes[type] ?: throw IllegalArgumentException("'type' must be one of ${notificationTypes.keys}. Obtained '$type'.")

  fun getImpactType(style: String): HapticsVibrationType =
    impactTypes[style] ?: throw IllegalArgumentException("'style' must be one of ${impactTypes.keys}. Obtained '$style'.")

  fun getSelectionType(): HapticsVibrationType =
    HapticsVibrationType(
      timings = longArrayOf(0, 35),
      amplitudes = intArrayOf(0, 110),
      oldFallback = longArrayOf(0, 35)
    )

  fun getAndroidHapticsType(type: String): Int {
    val hapticInfo = ALL_HAPTIC_TYPES[type]
      ?: throw IllegalArgumentException(
        "'type' must be one of ${ALL_HAPTIC_TYPES.keys.joinToString()}. Obtained '$type'."
      )
    return if (Build.VERSION.SDK_INT >= hapticInfo.requiredApi) {
      hapticInfo.constant
    } else {
      HapticFeedbackConstants.VIRTUAL_KEY
    }
  }
}

