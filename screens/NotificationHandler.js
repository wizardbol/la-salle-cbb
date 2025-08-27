// screens/NotificationHandler.js
import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import * as Notifications from 'expo-notifications';

export default function NotificationHandler({ navigation }) {
  useEffect(() => {
    const handleInitialNotification = async () => {
      const lastNotification = await Notifications.getLastNotificationResponseAsync();

      if (lastNotification) {
        const { screen, userId } = lastNotification.notification.request.content.data;
        const notificationId = lastNotification.notification.request.identifier;

        navigation.replace('Estudiantes', {
          notificationData: { screen, userId, notificationId }
        });
      } else {
        navigation.replace('Estudiantes');
      }
    };

    handleInitialNotification();
  }, []);

  return null; // Puedes agregar un spinner o una pantalla de carga aquí si deseas
}
