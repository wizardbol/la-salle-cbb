import React, { useEffect, useRef } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Notifications from 'expo-notifications';
import { StartNotifications } from "./utils/actions";
import Navigation from './navigations/Navigation';
import PasswordManager from './screens/PasswordManager';
import Loginpru from './screens/Loginpru';
import NotificationHandler from './screens/NotificationHandler';
import { Alert } from "react-native";

const Stack = createNativeStackNavigator();

function App() {
  const navigationRef = useRef(null);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      const { title, body, data } = notification.request.content;
      const { screen, userId } = data;
      const notificationId = notification.request.identifier;

      Alert.alert(
        title || 'Notificación',
        body || `Mensaje recibido para el usuario: ${userId} en la pantalla: ${screen}`,
        [
          {
            text: 'Aceptar', onPress: () => {
              navigationRef.current?.navigate('Estudiantes', {
                notificationData: { screen, userId, notificationId }
              });
            }
          }
        ],
        { cancelable: false }
      );
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      const { screen, userId } = response.notification.request.content.data;
      const notificationId = response.notification.request.identifier;

      navigationRef.current?.navigate('Estudiantes', {
        notificationData: { screen, userId, notificationId }
      });
    });

    StartNotifications(notificationListener, responseListener);

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="NotificationHandler">
        <Stack.Screen
          name="NotificationHandler"
          component={NotificationHandler}
          options={{ headerShown: false }} // Ocultamos encabezado solo aquí
        />
        <Stack.Screen
          name="Estudiantes"
          component={PasswordManager}
          options={{ headerShown: true, title: 'Estudiantes' }}
        />
        <Stack.Screen
          name="Registro"
          component={Loginpru}
          options={{ headerShown: true, title: 'Registro' }}
        />
        <Stack.Screen
          name="Menu"
          component={Navigation}
          options={{ headerShown: true, title: 'Menú Principal' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
