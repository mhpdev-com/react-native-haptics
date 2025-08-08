import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export type NotificationFeedback = 'error' | 'success' | 'warning';
export type ImpactFeedback = 'soft' | 'light' | 'rigid' | 'heavy' | 'medium';
export type AndroidHapticsFeedback =
  | 'reject'
  | 'confirm'
  | 'toggle-on'
  | 'no-haptics'
  | 'long-press'
  | 'drag-start'
  | 'clock-tick'
  | 'toggle-off'
  | 'virtual-key'
  | 'gesture-end'
  | 'keyboard-tap'
  | 'segment-tick'
  | 'gesture-start'
  | 'context-click'
  | 'keyboard-press'
  | 'text-handle-move'
  | 'keyboard-release'
  | 'virtual-key-release'
  | 'segment-frequent-tick';

export interface Spec extends TurboModule {
  /**
   * Triggers haptic feedback based on the provided selection feedback type.
   * @returns A promise that resolves when the haptic feedback is completed.
   */
  selection(): Promise<void>;
  /**
   * Triggers haptic feedback based on the provided impact style.
   * @param style The type of impact feedback to trigger.
   * @returns A promise that resolves when the haptic feedback is completed.
   */
  impact(style: ImpactFeedback): Promise<void>;
  /**
   * Triggers haptic feedback based on the provided selection feedback type.
   * @platform android
   * @returns A promise that resolves when the haptic feedback is completed.
   */
  androidHaptics(type: AndroidHapticsFeedback): Promise<void>;
  /**
   * Triggers haptic feedback based on the provided notification type.
   * @param type The type of notification feedback to trigger.
   * @returns A promise that resolves when the haptic feedback is completed.
   */
  notification(type: NotificationFeedback): Promise<void>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('Haptics');
