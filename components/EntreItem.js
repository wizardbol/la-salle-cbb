import React from "react";
import { View, Text, StyleSheet ,TouchableOpacity, Alert } from "react-native";
import { postCitas } from "../api";
const EntreItem = ({ task }) => {
  console.log("TASK",task);
  const horarioDate = new Date(
    parseInt(task.HORARIO.substring(6, 10)), // Año
    parseInt(task.HORARIO.substring(3, 5)) - 1, // Mes (0-11)
    parseInt(task.HORARIO.substring(0, 2)) // Día
  );
  const today = new Date();
  const canCancel = today < horarioDate;
  const onCancel = async (task) => {
    console.log("CAN", task.CODALU, task.CODSER);
    Alert.alert(
      "Confirmar Cancelación",
      "¿Estás seguro de que deseas cancelar esta entrevista?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancelación abortada"),
          style: "cancel"
        },
        { text: "Confirmar", onPress: () => confirmCancel(task) }
      ]
    );
  };

  const confirmCancel = async (task) => {
    //console.log("Entrevistacc :", task.CODALU, task.CODSER);
    try {
      // Llama a la función putCita con los parámetros adecuados
      const resu = await postCitas(task.CODALU, task.CODSER);
      console.log("Entrevista cancelada:", resu, task);
    } catch (error) {
      console.log('Error cancelando entrevista:', error);
    }
  };
  return (
    <View style={styles.itemContainer}>
      <View style={styles.materiaFechaContainer}>
        {task.MATERIA && (
          <View style={styles.matItem}>
            <Text style={styles.itemText}>{task.MATERIA}{task.CANCELADO}</Text>
          </View>
        )}
        
      </View>
      <View>
        {task.HORARIO && (
          <View style={styles.fechaItem}>
            <Text style={styles.itemText}>{task.HORARIO}</Text>
          </View>
        )}
      </View>
      <View>
        {task.MOTIVO && (
          <View style={styles.indexItem}>
            <Text style={styles.itemText}>{task.MOTIVO}</Text>
          </View>
        )}
        {task.descripcion && (
          <View style={styles.descriptionItem}>
            <Text style={styles.itemText}>{task.motivo}</Text>
          </View>
        )}
      </View>

      {!task.CANCELADO ? (
        canCancel && (
          <TouchableOpacity onPress={() => onCancel(task)} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancelar Entrevista</Text>
          </TouchableOpacity>
        )
      ) : (
        <Text style={styles.cancelledText}>Entrevista Cancelada</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'column',
    padding: 10,
  },
  materiaFechaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 1,
  },
  matItem: {
    flex: 1,
    backgroundColor: "#989898",
    padding: 6,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fechaItem: {
    flex: 0.5,
    backgroundColor: "#2897f4",
    padding: 6,
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
    flex: 0.05,
    backgroundColor: "#2897f4",
    padding: 6,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 1,
  },
  descriptionItem: {
    flex: 0.9,
    backgroundColor: "#2897f4",
    padding: 6,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    color: "black",
    fontSize: 18,
  },
  cancelButton: {
    // Estilos para tu botón de cancelar
  },
  cancelButtonText: {
    // Estilos para el texto del botón de cancelar
  },
  cancelledText: {
    // Estilos para el texto de entrevista cancelada
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default EntreItem;

