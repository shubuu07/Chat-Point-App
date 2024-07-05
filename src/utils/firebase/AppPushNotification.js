import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { onDisplayNotification } from './NotificationServices';

const AppPushNotification = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', remoteMessage);
      onDisplayNotification(remoteMessage);
    });

    messaging().onNotificationOpenedApp(async remoteMessage => {
      if (remoteMessage?.data?.screen_name == "statusTracking") {
        setTimeout(() => {
          NavigationService.navigate(remoteMessage?.data?.screen_name,
            {
              button: remoteMessage?.data?.button,
              orderId: remoteMessage?.data?.orderId,
              orderfor: remoteMessage?.data?.orderfor
            })
        }, 1200);
      }
    });

    return unsubscribe;
  }, []);
}

export default AppPushNotification