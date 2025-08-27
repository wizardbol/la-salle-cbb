import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const MatItem = ({ task }) => {
  const navigation = useNavigation();

  const navigateToDetails = () => {
    // Navegar a la página de detalles con los datos relevantes
    navigation.navigate("DetailsCita", {
      materia: task.MATERIA,
      profesor: task.NOMTIT,
      codigo: task.CODTIT,
      dia: task.DIA,
      horario: task.HORARIO,
    });
  };

  return (
    <TouchableOpacity style={styles.itemContainer} onPress={navigateToDetails}>
      <View style={styles.columnContainer}>
        <Text style={styles.columnHeader}>Materia</Text>
        <Text style={styles.matItem}>{task.MATERIA}</Text>
      </View>
      <View style={styles.columnContainer}>
        <Text style={styles.columnHeader}>Profesor</Text>
        <Text style={styles.ProfItem}>{task.NOMTIT}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between',
  },
  columnContainer: {
    flex: 1,  // Ocupa igual espacio en la fila
    paddingHorizontal: 5,
  },
  columnHeader: {
    color: "red",  // Color del título de la columna
    fontSize: 18,
    marginBottom: 5,
  },
  matItem: {
    backgroundColor: "#989898",
    color:"white",
    padding: 6,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ProfItem: {
    backgroundColor: "#2897f4",
    color:"white",
    padding: 6,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    color: "#ffffff",
    fontSize: 18,
  },
});

export default MatItem;
