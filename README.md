<p align="center">
  <a href="https://mhpdev.com" target="_blank">
    <img src="./docs/banner.png" alt="React Native Full Responsive Banner" style="max-width:100%;height:auto;" />
  </a>
</p>

A high-performance React Native library for iOS haptics and Android vibration effects.

<div align="center">
  <a href="./docs/USAGE.md">Documentation</a> · <a href="./example/">Example</a>
</div>
<br/>

> **Only New Architecture**: This library is only compatible with the new architecture. If you're using React Native 0.76 or higher, it is already enabled. However, if your React Native version is between 0.68 and 0.75, you need to enable it first. [Click here if you need help enabling the new architecture](https://github.com/reactwg/react-native-new-architecture/blob/main/docs/enable-apps.md)

## Features

- 🚀 &nbsp;High-performance library built with Turbo Modules for Android and iOS

- 🎛️ &nbsp;Provides essential methods for triggering native haptic feedback

- 🤖 &nbsp;Supports a wide range of Android-specific vibration effects

- 🛠️ &nbsp;Easy to use with simple APIs

- 🧵 &nbsp;Executes on the UI thread to ensure instant feedback

- ✅ &nbsp;Fully type-safe and written in TypeScript

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

## Usage

To learn how to use the library, check out the [usage section](./docs/USAGE.md).

## Benchmarks (RN Haptics vs Expo Haptics)

The following benchmark results are for 200 time executions ([Click here to see the full report repository](https://github.com/Mhp23/RN-Haptics-Benchmarks)):

#### How much faster on iOS (iPhone 14 Pro Max)?

| Effect               | React Native Haptics | Expo Haptics |   Speedup (RN / Expo) |
| -------------------- | -------------------: | -----------: | --------------------: |
| Impact Heavy         |                0.779 |        0.365 | 0.779 / 0.365 ≈ 2.13x |
| Notification Success |                1.378 |        0.365 | 1.378 / 0.365 ≈ 3.78x |
| Selection            |                0.602 |        0.350 | 0.602 / 0.350 ≈ 1.72x |

#### How much faster on Android (Samsung A55)?

| Effect               | React Native Haptics | Expo Haptics |                    Speedup (RN / Expo) |
| -------------------- | -------------------: | -----------: | -------------------------------------: |
| Impact Heavy         |                9.766 |        2.902 |                  9.766 / 2.902 ≈ 3.37x |
| Notification Success |               10.837 |        3.433 |                 10.837 / 3.433 ≈ 3.16x |
| Selection            |               11.236 |        3.037 |                 11.236 / 3.037 ≈ 3.70x |
| Android Haptics      |                1.879 |        3.238 | 3.238 / 1.879 ≈ 1.72x (Expo is faster) |

## Quick Start

```tsx
import React from 'react';
import Haptics from '@mhpdev/react-native-haptics';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';

const App: React.FC = () => {
  const onImpactPress = () => {
    Haptics.impact('heavy');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onImpactPress}>
        <Text style={styles.buttonText}>Trigger Heavy Impact</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 12.5,
    borderRadius: 5,
    backgroundColor: 'skyblue',
  },
  buttonText: {
    fontSize: 22,
    fontWeight: '600',
  },
});
```

To become more familiar with the usage of the library, check out the [example project](./example/).

## Testing

To mock the package's methods and components using the default mock configuration provided, follow these steps:

- Create a file named `@mhpdev/react-native-haptics.ts` inside your `__mocks__` directory.

- Copy the following code into that file:

  ```js
  jest.mock('@mhpdev/react-native-haptics', () =>
    require('@mhpdev/react-native-haptics/jest'),
  );
  ```

## Contributing

See the [contributing guide](./CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
