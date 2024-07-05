import messaging from '@react-native-firebase/messaging';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import notifee, { AndroidImportance, AndroidStyle } from '@notifee/react-native';
import images from '../../constants/images';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function requestUserPermission() {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getFcmToken()
        } else {
            Alert.alert('Permission Denied', 'Please grant location permission to use this feature')
        }
    } else {
        const authStatus = await messaging().requestPermission();
        const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        if (enabled) {
            console.log('Authorization status:', authStatus);
            getFcmToken()
        }
    }
}

const getFcmToken = async () => {
    try {
        const token = await messaging().getToken();
        await AsyncStorage.setItem('@fcm_token', token);
        console.log("fcm token================>", token);
    } catch (error) {
        console.log("error in creating token", error);
    }
};

export async function onDisplayNotification(data) {
    try {
        if (Platform.OS === 'ios') {
            await notifee.requestPermission();
        }

        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Max Bazaar',
            vibration: true,
            sound: 'default',
            importance: AndroidImportance.HIGH,
        });

        const { title, body } = data.notification;
        const imageUrl = data.data.image;
        const notification = {
            title: title || 'Notification',
            body: body || '',
            android: {
                channelId,
                importance: AndroidImportance.HIGH,
                largeIcon: images.Logo,
            },
            ios: {
                sound: 'default',
            },
        };
        if (imageUrl && typeof imageUrl === 'string' && imageUrl.startsWith('http')) {
            notification.android.style = {
                type: AndroidStyle.BIGPICTURE,
                picture: imageUrl,
            };
        }
        await notifee.displayNotification(notification);
    } catch (error) {
        console.log('Error displaying notification:', error);
    }
}
