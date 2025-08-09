import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

/**
 * Represents the feedback type for notifications, corresponding to Apple's `UINotificationFeedbackGenerator.FeedbackType`.
 * On Android, the behavior is simulated to match the iOS equivalent as closely as possible.
 * @see https://developer.apple.com/documentation/uikit/uinotificationfeedbackgenerator/feedbacktype
 *
 * - `success`: Indicates that a task or action has completed successfully.
 * - `warning`: Indicates that a task or action has produced a warning.
 * - `error`: Indicates that a task or action has failed.
 */
export type NotificationFeedback = 'success' | 'warning' | 'error';

/**
 * Specifies the intensity of a haptic impact, corresponding to Apple's `UIImpactFeedbackGenerator.FeedbackStyle`.
 * On Android, the behavior is simulated to match the iOS equivalent.
 * @see https://developer.apple.com/documentation/uikit/uiimpactfeedbackgenerator/feedbackstyle
 *
 * - `light`: A collision between small, light user interface elements.
 * - `medium`: A collision between moderately sized user interface elements.
 * - `heavy`: A collision between large, heavy user interface elements.
 * - `soft`: A collision between user interface elements that are soft, with a large amount of compression or elasticity. (iOS 13.0+)
 * - `rigid`: A collision between user interface elements that are rigid, with a small amount of compression or elasticity. (iOS 13.0+)
 */
export type ImpactFeedback = 'light' | 'medium' | 'heavy' | 'soft' | 'rigid';

/**
 * A set of predefined haptic types corresponding to Android's native `HapticFeedbackConstants`.
 *
 * **Note:** Availability varies by Android SDK version. If a requested type is
 * unsupported on the device, it safely falls back to `virtual-key`.
 * @platform android
 * @see https://developer.android.com/reference/android/view/HapticFeedbackConstants
 *
 * - `clock-tick`: Feedback for a clock tick, e.g., while setting the time.
 * - `confirm`: Confirms a user's action. (Requires API 30+)
 * - `context-click`: Feedback for a context-click or right-click. (Requires API 23+)
 * - `drag-start`: Indicates the start of a drag action. (Requires API 34+)
 * - `gesture-end`: Indicates the end of a gesture. (Requires API 30+)
 * - `gesture-start`: Indicates the start of a gesture. (Requires API 30+)
 * - `gesture-threshold-activate`: Indicates the activation of a gesture threshold. (Requires API 34+)
 * - `gesture-threshold-deactivate`: Indicates the deactivation of a gesture threshold. (Requires API 34+)
 * - `keyboard-press`: Feedback for pressing a key on a soft keyboard. (Requires API 27+)
 * - `keyboard-release`: Feedback for releasing a key on a soft keyboard. (Requires API 27+)
 * - `keyboard-tap`: Feedback for a tap on a soft keyboard key.
 * - `long-press`: Feedback for a long press on an object.
 * - `no-haptics`: Explicitly specifies that no haptic feedback should be provided. (Requires API 34+)
 * - `reject`: Rejects a user's action. (Requires API 30+)
 * - `segment-frequent-tick`: A frequent tick in a segmented control. (Requires API 34+)
 * - `segment-tick`: A tick in a segmented control. (Requires API 34+)
 * - `text-handle-move`: Feedback for moving a text selection handle. (Requires API 27+)
 * - `toggle-off`: Indicates a toggle has been turned off. (Requires API 34+)
 * - `toggle-on`: Indicates a toggle has been turned on. (Requires API 34+)
 * - `virtual-key`: Feedback for a virtual key press.
 * - `virtual-key-release`: Feedback for a virtual key release. (Requires API 27+)
 */
export type AndroidHapticsFeedback =
  | 'clock-tick'
  | 'confirm'
  | 'context-click'
  | 'drag-start'
  | 'gesture-end'
  | 'gesture-start'
  | 'gesture-threshold-activate'
  | 'gesture-threshold-deactivate'
  | 'keyboard-press'
  | 'keyboard-release'
  | 'keyboard-tap'
  | 'long-press'
  | 'no-haptics'
  | 'reject'
  | 'segment-frequent-tick'
  | 'segment-tick'
  | 'text-handle-move'
  | 'toggle-off'
  | 'toggle-on'
  | 'virtual-key'
  | 'virtual-key-release';

export interface Spec extends TurboModule {
  /**
   * Triggers a haptic feedback to indicate a selection change.
   * Corresponds to `UISelectionFeedbackGenerator` on iOS.
   * @returns A promise that resolves when the haptic feedback is completed.
   */
  selection(): Promise<void>;
  /**
   * Triggers an impact haptic feedback.
   * Corresponds to `UIImpactFeedbackGenerator` on iOS.
   * @param style The intensity of the impact feedback.
   * @returns A promise that resolves when the haptic feedback is completed.
   */
  impact(style: ImpactFeedback): Promise<void>;
  /**
   * Triggers a notification haptic feedback to communicate success, warning, or error.
   * Corresponds to `UINotificationFeedbackGenerator` on iOS.
   * @param type The type of notification feedback to trigger.
   * @returns A promise that resolves when the haptic feedback is completed.
   */
  notification(type: NotificationFeedback): Promise<void>;
  /**
   * Triggers a platform-specific haptic feedback on Android.
   * @platform android
   * @param type The Android-specific haptic feedback constant to use.
   * @returns A promise that resolves when the haptic feedback is completed.
   */
  androidHaptics(type: AndroidHapticsFeedback): Promise<void>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('Haptics');
