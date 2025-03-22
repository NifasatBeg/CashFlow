import RNAndroidNotificationListener from 'react-native-android-notification-listener';

export const checkAndRequestNotificationPermission = async () => {
  try {
    const status = await RNAndroidNotificationListener.getPermissionStatus();
    console.log("Notification Listener Permission Status:", status);

    if (status !== 'authorized') {
      await RNAndroidNotificationListener.requestPermission();
    }
  } catch (error) {
    console.error("Error checking/requesting notification permission:", error);
  }
};
