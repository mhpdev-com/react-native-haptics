import React from 'react';
import {
  Text,
  Platform,
  StatusBar,
  ScrollView,
  StyleSheet,
  type TextStyle,
  useColorScheme,
} from 'react-native';
import Haptics from '@mhpdev/react-native-haptics';
import HapticButton from './components/HapticButton';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {AndroidHaptics, Impacts, Notifications} from './core/config';

const AppContent: React.FC = () => {
  const scheme = useColorScheme();

  const titleStyle = React.useMemo<TextStyle>(() => {
    return {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginVertical: 10,
      color: scheme === 'dark' ? 'white' : 'black',
    };
  }, [scheme]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <Text style={titleStyle}>React Native Haptics Examples</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        <Text style={titleStyle}>Haptics Impacts</Text>
        {Impacts.map(impact => (
          <HapticButton
            key={impact.name}
            title={impact.name}
            onPress={() => Haptics.impact(impact.style)}
          />
        ))}
        <Text style={titleStyle}>Haptics Notfications</Text>
        {Notifications.map(notification => (
          <HapticButton
            key={notification.name}
            title={notification.name}
            onPress={() => Haptics.notification(notification.type)}
          />
        ))}
        <Text style={titleStyle}>Haptics Selection</Text>
        <HapticButton title="Selection" onPress={Haptics.selection} />
        {Platform.OS !== 'android' ? null : (
          <React.Fragment>
            <Text style={titleStyle}>Android Haptics</Text>
            {AndroidHaptics.map(haptic => (
              <HapticButton
                key={haptic.name}
                title={haptic.name}
                onPress={() => Haptics.androidHaptics(haptic.type)}
              />
            ))}
          </React.Fragment>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 5,
  },
  content: {
    marginTop: 10,
    paddingBottom: 40,
    alignItems: 'center',
  },
});
