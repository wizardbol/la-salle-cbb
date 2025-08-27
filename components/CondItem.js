import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CondItem = ({ task, mostrarMateriaYFecha }) => {
  return (
    <View style={styles.itemContainer}>
      {mostrarMateriaYFecha && (
        <View style={styles.materiaFechaContainer}>
          {task.MATERIA && (
            <View style={styles.matItem}>
              <Text style={styles.itemText}>{task.MATERIA}</Text>
            </View>
          )}
          {task.FECHA && (
            <View style={styles.fechaItem}>
              <Text style={styles.itemText}>{task.FECHA}</Text>
            </View>
          )}
        </View>
      )}
      <View style={styles.indexDescriptionContainer}>
        {task.indice && (
          <View style={styles.indexItem}>
            <Text style={styles.itemText}>{task.indice}</Text>
          </View>
        )}
        {task.descripcion && (
          <View style={styles.descriptionItem}>
            <Text style={styles.itemText}>{task.descripcion}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'column',
    padding: 5,
  },
  materiaFechaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 1, // Reducido el margen inferior
  },
  matItem: {
    flex: 0.5,
    backgroundColor: "#989898",
    padding: 3,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fechaItem: {
    flex: 0.5,
    backgroundColor: "#2897f4",
    padding: 3,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indexDescriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  indexItem: {
    flex: 0.08,
    backgroundColor: "#2897f4",
    padding: 3,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  descriptionItem: {
    flex: 0.92,
    backgroundColor: "#2897f4",
    padding: 3, // Ajustado para coincidir con los otros elementos
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    color: "black",
    fontSize: 13,
  },
});

export default CondItem;
