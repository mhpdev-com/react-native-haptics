# React Native Haptics Usage Guide

- [React Native Haptics Usage Guide](#react-native-haptics-usage-guide)
  - [Installation](#installation)
    - [Bare React Native](#bare-react-native)
    - [Expo](#expo)
  - [API Overview](#api-overview)
    - [**impact**](#impact)
    - [**notification**](#notification)
    - [**selection**](#selection)
    - [**androidHaptics**](#androidhaptics)
  - [Example Application](#example-application)

---

## Installation

### Bare React Native

Install the package using either npm or Yarn:

```sh
npm install @mhpdev/react-native-haptics
```

Or with Yarn:

```sh
yarn add @mhpdev/react-native-haptics
```

For iOS, navigate to the ios directory and install the pods:

```sh
cd ios && pod install
```

### Expo

For Expo projects, follow these steps:

1. Install the package:

   ```sh
   npx expo install @mhpdev/react-native-haptics
   ```

2. Since it is not supported on Expo Go, run:

   ```sh
   npx expo prebuild
   ```

---

## API Overview

The library exports a default `Haptics` object that provides methods for triggering haptic feedback.

```tsx
import Haptics from '@mhpdev/react-native-haptics';
```

---

### **impact**

Triggers an impact haptic feedback. This corresponds to `UIImpactFeedbackGenerator` on iOS. On Android, it simulates the equivalent vibration effect.

**API Definition:**

```ts
Haptics.impact(style: ImpactFeedback): Promise<void>
```

**ImpactFeedback Type:**

- `light`: A collision between small, light user interface elements.
- `medium`: A collision between moderately sized user interface elements.
- `heavy`: A collision between large, heavy user interface elements.
- `soft`: A collision between user interface elements that are soft, with a large amount of compression or elasticity. (iOS 13.0+)
- `rigid`: A collision between user interface elements that are rigid, with a small amount of compression or elasticity. (iOS 13.0+)

**Example Usage:**

```ts
import {ImpactFeedback} from '@mhpdev/react-native-haptics';

// Trigger a heavy impact
Haptics.impact('heavy');

// Trigger a light impact
Haptics.impact('light');
```

---

### **notification**

Triggers a notification haptic feedback to communicate success, warning, or error. This corresponds to `UINotificationFeedbackGenerator` on iOS. On Android, it simulates the equivalent vibration effect.

**API Definition:**

```ts
Haptics.notification(type: NotificationFeedback): Promise<void>
```

**NotificationFeedback Type:**

- `success`: Indicates that a task or action has completed successfully.
- `warning`: Indicates that a task or action has produced a warning.
- `error`: Indicates that a task or action has failed.

**Example Usage:**

```ts
import {NotificationFeedback} from '@mhpdev/react-native-haptics';

// Trigger a success notification
Haptics.notification('success');

// Trigger an error notification
Haptics.notification('error');
```

---

### **selection**

Triggers a haptic feedback to indicate a selection change. This corresponds to `UISelectionFeedbackGenerator` on iOS. On Android, it uses `HapticFeedbackConstants.VIRTUAL_KEY`.

**API Definition:**

```ts
Haptics.selection(): Promise<void>
```

**Example Usage:**

```ts
// Trigger a selection change haptic
Haptics.selection();
```

---

### **androidHaptics**

Triggers a platform-specific haptic feedback on Android. This method is a no-op on iOS.

> **Note:** Availability of each feedback type varies by Android SDK version. If a requested type is unsupported on the device, it safely falls back to `virtual-key`.

**API Definition:**

```ts
Haptics.androidHaptics(type: AndroidHapticsFeedback): Promise<void>
```

**AndroidHapticsFeedback Type:**

| Type                           | Description                                                      | Required API |
| :----------------------------- | :--------------------------------------------------------------- | :----------- |
| `clock-tick`                   | Feedback for a clock tick, e.g., while setting the time.         | -            |
| `confirm`                      | Confirms a user's action.                                        | 30+          |
| `context-click`                | Feedback for a context-click or right-click.                     | 23+          |
| `drag-start`                   | Indicates the start of a drag action.                            | 34+          |
| `gesture-end`                  | Indicates the end of a gesture.                                  | 30+          |
| `gesture-start`                | Indicates the start of a gesture.                                | 30+          |
| `gesture-threshold-activate`   | Indicates the activation of a gesture threshold.                 | 34+          |
| `gesture-threshold-deactivate` | Indicates the deactivation of a gesture threshold.               | 34+          |
| `keyboard-press`               | Feedback for pressing a key on a soft keyboard.                  | 27+          |
| `keyboard-release`             | Feedback for releasing a key on a soft keyboard.                 | 27+          |
| `keyboard-tap`                 | Feedback for a tap on a soft keyboard key.                       | -            |
| `long-press`                   | Feedback for a long press on an object.                          | -            |
| `no-haptics`                   | Explicitly specifies that no haptic feedback should be provided. | 34+          |
| `reject`                       | Rejects a user's action.                                         | 30+          |
| `segment-frequent-tick`        | A frequent tick in a segmented control.                          | 34+          |
| `segment-tick`                 | A tick in a segmented control.                                   | 34+          |
| `text-handle-move`             | Feedback for moving a text selection handle.                     | 27+          |
| `toggle-off`                   | Indicates a toggle has been turned off.                          | 34+          |
| `toggle-on`                    | Indicates a toggle has been turned on.                           | 34+          |
| `virtual-key`                  | Feedback for a virtual key press.                                | -            |
| `virtual-key-release`          | Feedback for a virtual key release.                              | 27+          |

**Example Usage:**

```ts
import {AndroidHapticsFeedback} from '@mhpdev/react-native-haptics';

// Trigger a long press haptic on Android
Haptics.androidHaptics('long-press');

// Trigger a confirm haptic on Android
Haptics.androidHaptics('confirm');
```

---

## Example Application

Check out the [example project](../example/).
