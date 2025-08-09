package com.haptics

import android.content.Context
import android.os.Build
import android.os.Vibrator
import android.os.VibrationEffect
import com.haptics.HapticsVibrationType
import android.view.HapticFeedbackConstants
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = HapticsModule.NAME)
class HapticsModule(reactContext: ReactApplicationContext) :
  NativeHapticsSpec(reactContext) {

  private val vibrator: Vibrator? by lazy {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
      val vibratorManager = reactContext.getSystemService(Context.VIBRATOR_MANAGER_SERVICE) as android.os.VibratorManager
      vibratorManager.defaultVibrator
    } else {
      @Suppress("DEPRECATION")
      reactContext.getSystemService(Context.VIBRATOR_SERVICE) as? Vibrator
    }
  }

  override fun getName(): String {
    return NAME
  }

  override fun impact(style: String, promise: Promise) {
    try {
      val vibrationType = HapticsUtils.getImpactType(style)
      vibrate(vibrationType)
      promise.resolve(null)
    } catch (e: IllegalArgumentException) {
      promise.reject("E_INVALID_STYLE", e.message)
    } catch (e: Exception) {
      promise.reject("E_UNEXPECTED", "An unexpected error occurred: ${e.message}", e)
    }
  }

  override fun notification(type: String, promise: Promise) {
    try {
      val vibrationType = HapticsUtils.getNotificationType(type)
      vibrate(vibrationType)
      promise.resolve(null)
    } catch (e: IllegalArgumentException) {
      promise.reject("E_INVALID_TYPE", e.message)
    } catch (e: Exception) {
      promise.reject("E_UNEXPECTED", "An unexpected error occurred: ${e.message}", e)
    }
  }

  override fun selection(promise: Promise) {
    try {
      vibrate(HapticsUtils.getSelectionType())
      promise.resolve(null)
    } catch (e: Exception) {
      promise.reject("E_UNEXPECTED", "An unexpected error occurred: ${e.message}", e)
    }
  }

  override fun androidHaptics(type: String, promise: Promise) {
    try {
      val view = currentActivity?.window?.decorView

      if (view == null) {
        promise.reject("E_NO_VIEW", "Could not get the current view.")
        return
      }
      val feedbackConstant = HapticsUtils.getAndroidHapticsType(type)

      reactApplicationContext.runOnUiQueueThread {
        view.performHapticFeedback(feedbackConstant)
      }
      promise.resolve(null)
    } catch (e: IllegalArgumentException) {
      promise.reject("E_INVALID_TYPE", e.message)
    } catch (e: Exception) {
      promise.reject("E_HAPTIC_FEEDBACK", "An unexpected error occurred: ${e.message}", e)
    }
  }

  private fun vibrate(type: HapticsVibrationType) {
    if (vibrator?.hasVibrator() == false) {
      return
    }
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      if (vibrator?.hasAmplitudeControl() == true) {
        val effect = VibrationEffect.createWaveform(type.timings, type.amplitudes, -1)
        vibrator?.vibrate(effect)
      } else {
        val effect = VibrationEffect.createWaveform(type.timings, -1)
        vibrator?.vibrate(effect)
      }
    } else {
      @Suppress("DEPRECATION")
      vibrator?.vibrate(type.oldFallback, -1)
    }
  }

  companion object {
    const val NAME = "Haptics"
  }
}