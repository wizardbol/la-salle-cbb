import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";


const CalItem = ({ task, id, title }) => {
  //console.log('calitem '+title+id);
  const navigation = useNavigation();
  const navigateToTaskForm = () => {};

  const navigateToTaskForm1 = () => {
    if (task.CON1 !== "_" && parseInt(task.CON1) > 0 && parseInt(task.CODMAT) < 20) {
      navigation.navigate("Detalle", { id: task.CODALU,title: title , codmat: task.CODMAT, codmat2: task.CODMAT2, con: '1', mat: task.MAT });
    }
  };
  const navigateToTaskForm2 = () => {
    if (task.CON2 !== "_" && parseInt(task.CON2) > 0 && parseInt(task.CODMAT) < 20) {
      navigation.navigate("Detalle", { id: task.CODALU,title: title ,codmat: task.CODMAT, codmat2: task.CODMAT2, con: '2', mat: task.MAT });
    }
  };
  const navigateToTaskForm3 = () => {
    if (task.CON3 !== "_" && parseInt(task.CON3) > 0 && parseInt(task.CODMAT) < 20) {
      navigation.navigate("Detalle", { id: task.CODALU,title: title ,codmat: task.CODMAT, codmat2: task.CODMAT2, con: '3', mat: task.MAT });
    }
  };
  const isLevelI = task.NIVEL && task.NIVEL.charAt(0) === "I";

  return (
    <View>
      {isLevelI ? (
        <View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.matItemLit} onPress={navigateToTaskForm}>
              <Text style={styles.itemText}>{task.MAT}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.litItem} onPress={navigateToTaskForm}>
              <Text>Parcial 1</Text>
              <Text style={styles.itemTextLit}>{task.LIT1 === '' ? "_" : task.LIT1}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.litItem} onPress={navigateToTaskForm}>
              <Text>Parcial 2</Text>
              <Text style={styles.itemTextLit}>{task.LIT2 === '' ? "_" : task.LIT2}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.litItem} onPress={navigateToTaskForm}>
              <Text>Parcial 3</Text>
              <Text style={styles.itemTextLit}>{task.LIT3 === '' ? "_" : task.LIT3}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.row}>
          <TouchableOpacity style={[styles.matItem, styles.itemSpacing]} onPress={navigateToTaskForm}>
            <Text style={styles.itemText}>{task.MAT}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.conItem, styles.itemSpacing]} onPress={navigateToTaskForm1}>
            <Text style={styles.itemText}>{task.CON1 === 0 ? "_" : task.CON1}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.conItem, styles.itemSpacing]} onPress={navigateToTaskForm2}>
            <Text style={styles.itemText}>{task.CON2 === 0 ? "_" : task.CON2}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.conItem} onPress={navigateToTaskForm3}>
            <Text style={styles.itemText}>{task.CON3 === 0 ? "_" : task.CON3}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },
  matItemLit: {
    flex: 1,  // 100% width
    backgroundColor: "#EAEDED",
    padding: 6,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  matItem: {
    flex: 0.65,  // 50% width
    backgroundColor: "#EAEDED",
    padding: 6,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  litItem: {
    flex: 1,  // 100% width
    backgroundColor: "#2897f4",
    padding: 6,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  conItem: {
    flex: 0.10,  // 15% width
    backgroundColor: "#2897f4",
    padding: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemSpacing: {
    marginRight: 4, // Espacio a la derecha
  },
  itemText: {
    color: "black",
    fontSize: 17,
  },
  itemTextLit: {
    color: "black",
    fontSize: 13,
  },
});

export default CalItem;
