import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants  from 'expo-constants';
//import expo-device from 'expo-device';
export const getToken = async () => {
try {
    // Verifica que se esté ejecutando en un dispositivo físico
    if (!Constants.isDevice) {
      Alert.alert("Aviso", "Las notificaciones push solo funcionan en dispositivos físicos.");
      return null;
    }

    // Solicitar permisos de notificación
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
      Alert.alert("Permiso denegado", "Debes permitir las notificaciones para continuar.");
      return null;
    }
  // Obtener el token de Expo Push
  const tokenData = (await Notifications.getExpoPushTokenAsync({
    projectId: Constants.expoConfig.extra.eas.projectId,
  })).data;

  const token = tokenData.data;
    console.log("Token obtenido:", token);

  //alert('Token de notificaciones:'+ token);
  // Configuraciones específicas de Android
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
  return token;
} catch (error) {
    console.error("Error al obtener token:", error);
    Alert.alert("Error", "Hubo un problema al obtener el token de notificaciones.");
    return null;
  }
};

export const StartNotifications = (notificationListener, responseListener) => {
  notificationListener.current = Notifications.addNotificationReceivedListener(
    (notification) => {
      console.log(notification);
    }
  );

  responseListener.current = Notifications.addNotificationResponseReceivedListener(
    (notification) => {
      console.log(notification);
    }
  );

  return () => {
    Notifications.removeNotificationSubscription(notificationListener);
    Notifications.removeNotificationSubscription(responseListener);
  };
};
