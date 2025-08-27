import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ExaList from "../components/ExaList";

const Examenes = ({ navigation, route }) => {
  const { title = "Sin título", id = "" } = route?.params || {};

  useLayoutEffect(() => {
    navigation?.setOptions?.({ title: "Exámenes y tareas" });
  }, [navigation]);

  if (!id) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>ID del estudiante no disponible.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/*<Text style={styles.info}>ID: {id}</Text>"
       Text style={styles.info}>Estudiante: {title}</Text>
      */}
      <ExaList id={id} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  error: {
    fontSize: 18,
    color: 'red',
  },
});

export default Examenes;
