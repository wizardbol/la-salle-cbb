import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ActItem = ({ task, expanded }) => {
  const { Mat, nrohora, contenido, actividad } = task;

  return (
    <View style={styles.itemContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.materiaText}>{nrohora} - {Mat}</Text>
      </View>
      {expanded && (
        <View style={styles.detailsContainer}>
          {contenido !== '' && (
            <Text style={styles.contenidoText}>Contenido: {contenido}</Text>
          )}
          {actividad !== '' && (
            <Text style={styles.actividadText}>Actividad: {actividad}</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    borderRadius: 10,
    marginVertical: 4, // Antes 10 → ahora más junto
    backgroundColor: '#ffffff',
    borderColor: '#e0e0e0',
    borderWidth: 1,
    elevation: 1,
    overflow: 'hidden',
  },
  headerContainer: {
    backgroundColor: '#00796B',
    padding: 8, // Antes 12
  },
  materiaText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  detailsContainer: {
    backgroundColor: '#fafafa',
    padding: 8, // Antes 12
  },
  contenidoText: {
    fontSize: 15,
    color: '#8E44AD',
    marginBottom: 4, // Antes 6
    fontWeight: '500',
  },
  actividadText: {
    fontSize: 15,
    color: '#039BE5',
    fontWeight: '500',
  },
});

export default ActItem;
