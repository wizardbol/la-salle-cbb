// Navigation.js
import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';

import SearchStack from '../screens/SearchStack';
import ScreenNotas from '../screens/ScreenNotas';
import Seduca from '../screens/Seduca';
import Pagina from '../screens/Pagina';
import Citas from '../screens/Citas';
import Detalle from '../screens/Detalle';
import { navigationRef } from '../screens/RootNavigation';

const Tab = createBottomTabNavigator();

const Navigation = ({ route }) => {
  const { title, id, token, notificationId, userId, nivel } = route.params;

  return (
    <NavigationContainer
      independent={true}
      ref={navigationRef}
      onStateChange={() => {
        const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;
        if (currentRouteName === 'Comunicado' && notificationId) {
          Notifications.dismissNotificationAsync(notificationId);
        }
      }}
    >
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { display: 'none' },
          headerTitleStyle: {
            fontSize: 15,
            color: 'black',
          }
        }}
      >

        <Tab.Screen
          name="Menu"
          component={SearchStack}
          initialParams={{ title, id, token, notificationId, userId, nivel }}
          options={{
            tabBarLabel: "Menú",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="menu" color={color} size={size} />
            ),
            headerTitle: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons name="account-circle-outline" size={18} color="#007AFF" style={{ marginRight: 6 }} />
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                  {`${title} - ${nivel}`}
                </Text>
              </View>
            )
          }}
        />

        <Tab.Screen
          name="Notas"
          component={ScreenNotas}
          initialParams={{ title, id, token, notificationId, userId, nivel }}
        />

        <Tab.Screen
          name="Seduca"
          component={Seduca}
          initialParams={{ title, id, token, notificationId, userId, nivel }}
        />

        <Tab.Screen
          name="Pagina"
          component={Pagina}
          initialParams={{ title, id, token, notificationId, userId, nivel }}
        />

        <Tab.Screen
          name="Citas"
          component={Citas}
          initialParams={{ title, id, token, notificationId, userId, nivel }}
        />

        <Tab.Screen
          name="Detalle"
          component={Detalle}
          initialParams={{ title, id, token, notificationId, userId, nivel }}
        />

      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
