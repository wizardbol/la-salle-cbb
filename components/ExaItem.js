import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ExaItem = ({ task, expanded }) => {
  const { Mat, contenido, actividad } = task;

  return (
    <View style={styles.itemContainer}>
      <View style={styles.materiaContainer}>
        <Text style={styles.materiaText}>{Mat}</Text>
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
    marginVertical: 8,
    padding: 12,
    backgroundColor: '#f9f9f9',
    elevation: 2,
  },
  materiaContainer: {
    backgroundColor: '#3a86ff',
    padding: 10,
    borderRadius: 8,
  },
  materiaText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  detailsContainer: {
    marginTop: 10,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#eef2ff',
  },
  contenidoText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 6,
  },
  actividadText: {
    fontSize: 16,
    color: '#007f5f',
  },
});

export default ExaItem;
