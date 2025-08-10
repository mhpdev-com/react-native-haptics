import type {
  AndroidHapticsFeedback,
  ImpactFeedback,
  NotificationFeedback,
} from '@mhpdev/react-native-haptics';
import type {HapticsDataWithStyle, HapticsDataWithType} from './types';

export const getRandomColor = () => {
  return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.5)`;
};

export const Impacts: HapticsDataWithStyle<ImpactFeedback>[] = [
  {
    name: 'Light',
    style: 'light',
  },
  {
    name: 'Medium',
    style: 'medium',
  },
  {
    name: 'Heavy',
    style: 'heavy',
  },
  {
    name: 'Soft',
    style: 'soft',
  },
  {
    name: 'Rigid',
    style: 'rigid',
  },
];

export const Notifications: HapticsDataWithType<NotificationFeedback>[] = [
  {
    name: 'Error',
    type: 'error',
  },
  {
    name: 'Success',
    type: 'success',
  },
  {
    name: 'Warning',
    type: 'warning',
  },
];

export const AndroidHaptics: HapticsDataWithType<AndroidHapticsFeedback>[] = [
  {
    name: 'Long Press',
    type: 'long-press',
  },
  {
    name: 'Keyboard Tap',
    type: 'keyboard-tap',
  },
  {
    name: 'Virtual Key',
    type: 'virtual-key',
  },
  {
    name: 'Clock Tick',
    type: 'clock-tick',
  },
  {
    name: 'Confirm',
    type: 'confirm',
  },
  {
    name: 'Reject',
    type: 'reject',
  },
  {
    name: 'Toggle On',
    type: 'toggle-on',
  },
  {
    name: 'Toggle Off',
    type: 'toggle-off',
  },
  {
    name: 'Drag Start',
    type: 'drag-start',
  },
  {
    name: 'Gesture Start',
    type: 'gesture-start',
  },
  {
    name: 'Gesture End',
    type: 'gesture-end',
  },
  {
    name: 'Context Click',
    type: 'context-click',
  },
  {
    name: 'Keyboard Press',
    type: 'keyboard-press',
  },
  {
    name: 'Keyboard Release',
    type: 'keyboard-release',
  },
  {
    name: 'Virtual Key Release',
    type: 'virtual-key-release',
  },
  {
    name: 'Text Handle Move',
    type: 'text-handle-move',
  },
  {
    name: 'Segment Tick',
    type: 'segment-tick',
  },
  {
    name: 'Segment Frequent Tick',
    type: 'segment-frequent-tick',
  },
  {
    name: 'No Haptics',
    type: 'no-haptics',
  },
];
