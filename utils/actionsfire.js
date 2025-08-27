import { Platform, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants'; // Import Constants

export const getToken = async () => {
  try {
    if (!Constants.isDevice) {
      Alert.alert('Dispositivo requerido', 'Debes usar un dispositivo físico para recibir notificaciones push.');
      return null;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync({
        ios: {
          allowAlert: true,
          allowBadge: true,
          allowSound: true,
        },
      });
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      Alert.alert('Permisos denegados', 'No se otorgaron permisos para notificaciones.');
      return null;
    }

    let tokenData;
    if (Platform.OS === 'ios') {
      // For iOS, include the experienceId (project_id)
      tokenData = await Notifications.getExpoPushTokenAsync({
        experienceId: '@your-username/your-project-slug', // Replace with your Expo username and project slug
      });
    } else {
      tokenData = await Notifications.getExpoPushTokenAsync();
    }
    
    const token = tokenData.data;

    console.log('Expo Push Token:', token); //
    Alert.alert('Token generado', token || 'Token no disponible'); //

    return token;
  } catch (error) {
    console.error('Error al obtener el token:', error); //
    Alert.alert('Error', 'No se pudo obtener el token de notificaciones.'); //
    return null;
  }
};

export const StartNotifications = (notificationListener, responseListener) => { //
  notificationListener.current = Notifications.addNotificationReceivedListener( //
    (notification) => { //
      console.log('Notificación recibida:', notification); //
    }
  );

  responseListener.current = Notifications.addNotificationResponseReceivedListener( //
    (response) => { //
      console.log('Respuesta a la notificación:', response); //
    }
  );

  return () => { //
    Notifications.removeNotificationSubscription(notificationListener.current); //
    Notifications.removeNotificationSubscription(responseListener.current); //
  };
};