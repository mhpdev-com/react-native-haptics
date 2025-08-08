import NativeHaptics, {
  type ImpactFeedback,
  type NotificationFeedback,
  type AndroidHapticsFeedback,
} from './NativeHaptics';
import {Platform} from 'react-native';

/**
 * Triggers haptic feedback based on the provided impact style.
 * @param style The type of impact feedback to trigger.
 * @returns A promise that resolves when the haptic feedback is completed.
 */
const impact = async (style: ImpactFeedback) => {
  await NativeHaptics.impact(style);
};
/**
 * Triggers haptic feedback based on the provided notification type.
 * @param type The type of notification feedback to trigger.
 * @returns A promise that resolves when the haptic feedback is completed.
 */
const notification = async (type: NotificationFeedback) => {
  await NativeHaptics.notification(type);
};
/**
 * Triggers haptic feedback based on the provided selection feedback type.
 * @platform android
 * @returns A promise that resolves when the haptic feedback is completed.
 */
const androidHaptics = async (type: AndroidHapticsFeedback) => {
  if (Platform.OS !== 'android') {
    return;
  }
  await NativeHaptics.androidHaptics(type);
};
/**
 * Triggers haptic feedback based on the provided selection feedback type.
 * @returns A promise that resolves when the haptic feedback is completed.
 */
const selection = async () => {
  await NativeHaptics.selection();
};

const Haptics = {impact, notification, androidHaptics, selection};
export default Haptics;
