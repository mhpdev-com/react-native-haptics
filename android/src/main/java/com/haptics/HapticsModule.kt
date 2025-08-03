package com.haptics

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = HapticsModule.NAME)
class HapticsModule(reactContext: ReactApplicationContext) :
  NativeHapticsSpec(reactContext) {

  override fun getName(): String {
    return NAME
  }

  companion object {
    const val NAME = "Haptics"
  }
}
