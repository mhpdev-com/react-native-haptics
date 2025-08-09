import NativeHaptics, {
  type ImpactFeedback,
  type NotificationFeedback,
  type AndroidHapticsFeedback,
} from './NativeHaptics';
import {Platform} from 'react-native';

/**
 * Triggers an impact haptic feedback.
 * Corresponds to `UIImpactFeedbackGenerator` on iOS.
 * @param style The intensity of the impact feedback.
 * @returns A promise that resolves when the haptic feedback is completed.
 */
const impact = async (style: ImpactFeedback) => {
  await NativeHaptics.impact(style);
};
/**
 * Triggers a notification haptic feedback to communicate success, warning, or error.
 * Corresponds to `UINotificationFeedbackGenerator` on iOS.
 * @param type The type of notification feedback to trigger.
 * @returns A promise that resolves when the haptic feedback is completed.
 */
const notification = async (type: NotificationFeedback) => {
  await NativeHaptics.notification(type);
};
/**
 * Triggers a platform-specific haptic feedback on Android.
 * @platform android
 * @param type The Android-specific haptic feedback constant to use.
 * @returns A promise that resolves when the haptic feedback is completed.
 */
const androidHaptics = async (type: AndroidHapticsFeedback) => {
  if (Platform.OS !== 'android') {
    return;
  }
  await NativeHaptics.androidHaptics(type);
};
/**
 * Triggers a haptic feedback to indicate a selection change.
 * Corresponds to `UISelectionFeedbackGenerator` on iOS.
 * @returns A promise that resolves when the haptic feedback is completed.
 */
const selection = async () => {
  await NativeHaptics.selection();
};

export type {ImpactFeedback, NotificationFeedback, AndroidHapticsFeedback};

const Haptics = {impact, notification, androidHaptics, selection};
export default Haptics;
