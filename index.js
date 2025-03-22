/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { headlessNotificationListener } from './src/app/Listeners/NotificationListener';
import { RNAndroidNotificationListenerHeadlessJsName } from 'react-native-android-notification-listener';

// Ignore specific warnings (optional)
LogBox.ignoreLogs(['Warning: ...']); 

// Register the main app component
AppRegistry.registerComponent(appName, () => App);

// Register background headless task
AppRegistry.registerHeadlessTask(
  RNAndroidNotificationListenerHeadlessJsName, 
  () => headlessNotificationListener
);
