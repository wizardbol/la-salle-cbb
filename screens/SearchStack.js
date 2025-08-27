// SearchStack.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Search from './Search';
import Examenes from './Examenes';
import Comunicado from './Comunicado';
import Conducta from './Conducta';
import Calificaciones from './Calificaciones';
import Pagos from './Pagos';
import Actividades from './Actividades';
import Entrevista from './Entrevista';

const Stack = createNativeStackNavigator();

const CustomHeader = ({ title, iconName }) => (
  <View style={styles.headerRow}>
    <Ionicons name={iconName} size={20} color="#007AFF" style={{ marginRight: 8 }} />
    <Text style={styles.headerText}>{title}</Text>
  </View>
);


const SearchStack = ({ route }) => {
  const { title, id, token, notificationId, userId } = route.params;

  return (
    <Stack.Navigator initialRouteName="MenuPrincipal">
      <Stack.Screen
        name="MenuPrincipal"
        options={{
          title: '',
          headerTitle: () =>
            <CustomHeader
              title="Menu" // nombre real del alumno
              iconName="home-outline"
            />
        }}
      >
        {props => (
          <Search
            {...props}
            title={title}
            id={id}
            token={token}
            notificationData={{ notificationId, userId }}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="Examenes"
        component={Examenes}
        options={({ route }) => ({
          title: '',
          headerTitle: () =>
            <CustomHeader
              iconName="document-text-outline"
              title="Exámenes y Tareas"
            />
        })}
      />

      <Stack.Screen
        name="Comunicado"
        component={Comunicado}
        options={({ route }) => ({
          title: '',
          headerTitle: () =>
            <CustomHeader
              title="Comunicado"
              iconName="chatbox-ellipses-outline"
            />
        })}
      />

      <Stack.Screen
        name="Conducta"
        component={Conducta}
        options={({ route }) => ({
          title: '',
          headerTitle: () =>
            <CustomHeader
              title="Conducta"
              iconName="checkmark-done-outline"
            />
        })}
      />

      <Stack.Screen
        name="Calificaciones"
        component={Calificaciones}
        options={({ route }) => ({
          title: '',
          headerTitle: () =>
            <CustomHeader
              title="Calificaciones"
              iconName="school-outline"
            />
        })}
      />

      <Stack.Screen
        name="Obligaciones"
        component={Pagos}
        options={({ route }) => ({
          title: '',
          headerTitle: () =>
            <CustomHeader
              title="Obligaciones"
              iconName="cash-outline"
            />
        })}
      />

      <Stack.Screen
        name="Actividades"
        component={Actividades}
        options={({ route }) => ({
          title: '',
          headerTitle: () =>
            <CustomHeader
              title="Actividades"
              iconName="calendar-outline"
            />
        })}
      />

      <Stack.Screen
        name="Entrevista"
        component={Entrevista}
        options={({ route }) => ({
          title: '',
          headerTitle: () =>
            <CustomHeader
              title="Entrevista"
              iconName="person-circle-outline"
            />
        })}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default SearchStack;
