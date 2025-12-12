package com.haptics

import android.content.Context
import android.os.Build
import android.os.Vibrator
import android.os.VibrationEffect
import android.media.AudioAttributes
import android.os.VibrationAttributes
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

  private val audioAttributes: AudioAttributes by lazy {
    AudioAttributes.Builder()
      .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
      .setUsage(AudioAttributes.USAGE_ASSISTANCE_SONIFICATION)
      .build()
  }

  private val vibrationAttributes: Any? by lazy {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
      VibrationAttributes.createForUsage(VibrationAttributes.USAGE_TOUCH)
    } else {
      null
    }
  }

  override fun getName(): String {
    return NAME
  }

  private fun runOnUiQueueThread(block: () -> Unit) {
    reactApplicationContext.runOnUiQueueThread(block)
  }

  private fun executeSafely(promise: Promise, errorCode: String, action: () -> Unit) {
    try {
      action()
    } catch (e: IllegalArgumentException) {
      promise.reject(errorCode, e.message, e)
    } catch (e: Exception) {
      promise.reject("E_UNEXPECTED", "An unexpected error occurred: ${e.message}", e)
    }
  }

  override fun impact(style: String, promise: Promise) {
    executeSafely(promise, "E_INVALID_STYLE") {
      val vibrationType = HapticsUtils.getImpactType(style)
      runOnUiQueueThread {
        vibrate(vibrationType)
      }
      promise.resolve(null)
    }
  }

  override fun notification(type: String, promise: Promise) {
    executeSafely(promise, "E_INVALID_TYPE") {
      val vibrationType = HapticsUtils.getNotificationType(type)
      runOnUiQueueThread {
        vibrate(vibrationType)
      }
      promise.resolve(null)
    }
  }

  override fun selection(promise: Promise) {
    val vibrationType = HapticsUtils.getSelectionType()
    runOnUiQueueThread {
      vibrate(vibrationType)
    }
    promise.resolve(null)
  }

  override fun androidHaptics(type: String, promise: Promise) {
    val view = currentActivity?.window?.decorView
    if (view == null) {
      promise.reject("E_NO_VIEW", "Could not get the current view.")
      return
    }
    executeSafely(promise, "E_INVALID_TYPE") {
      val feedbackConstant = HapticsUtils.getAndroidHapticsType(type)
      runOnUiQueueThread {
        view.performHapticFeedback(feedbackConstant)
      }
      promise.resolve(null)
    }
  }

  private fun vibrate(type: HapticsVibrationType) {
    if (vibrator?.hasVibrator() == false) {
      return
    }
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      val effect = if (vibrator?.hasAmplitudeControl() == true) {
        VibrationEffect.createWaveform(type.timings, type.amplitudes, -1)
      } else {
        VibrationEffect.createWaveform(type.timings, -1)
      }
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU && vibrationAttributes != null) {
        vibrator?.vibrate(effect, vibrationAttributes as VibrationAttributes)
      } else {
        vibrator?.vibrate(effect, audioAttributes)
      }
    } else {
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
        @Suppress("DEPRECATION")
        vibrator?.vibrate(type.oldFallback, -1, audioAttributes)
      } else {
        @Suppress("DEPRECATION")
        vibrator?.vibrate(type.oldFallback, -1)
      }
    }
  }

  companion object {
    const val NAME = "Haptics"
  }
}