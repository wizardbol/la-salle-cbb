import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  RefreshControl,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import * as RootNavigation from '../screens/RootNavigation';
import { getNotas } from "../api";
import CalItem from "./CalItem";

const CalList = ({ id, title }) => {
  const [tasks, setTasks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [tri1, setTri1] = useState("1ºT");
  const [tri2, setTri2] = useState("2ºT");
  const [tri3, setTri3] = useState("3ºT");
  const isFocused = useIsFocused();
  const navigateToTaskForm = () => {};
  
  const getUsers = async () => {
    try {
      const tasks = await getNotas(id);
      setTasks(tasks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [isFocused]);

  
  useEffect(() => {
    switch (tasks[0]?.nroparcial) {
      case 1:
        setTri1("1ºP");
        break;
      case 2:
        break;
      case 3:
        setTri2("3ºP");
        break;
      case 4:
        break;
      case 5:
        setTri3("5ºP");
        break;
      default:
        break;
    }
  }, [tasks]);

  const goToSeduca = () => {
    RootNavigation.navigate("Seduca", {
      title: title,
      id: id,
    });
  };
  
  const renderItem = ({ item }) => <CalItem task={item} id={id} title={title} />;

  return (
    <SafeAreaView style={styles.container}>
      {tasks.length > 0 ? (
        <>
          <View style={styles.buttonContainer}>
  <TouchableOpacity onPress={goToSeduca} style={styles.button}>
    <Text style={styles.buttonText}>Ver boletines</Text>
  </TouchableOpacity>
</View>
<View style={styles.row}>
<TouchableOpacity style={[styles.matTitle, styles.itemSpacing]} onPress={navigateToTaskForm}>
  <Text style={styles.title}>MATERIA</Text>
</TouchableOpacity>
<TouchableOpacity style={[styles.trimTitle, styles.itemSpacing]} onPress={navigateToTaskForm}>
  <Text style={styles.title}>{tri1}</Text>
</TouchableOpacity>
<TouchableOpacity style={[styles.trimTitle, styles.itemSpacing]} onPress={navigateToTaskForm}>
<Text style={styles.title}>{tri2}</Text>
</TouchableOpacity>
<TouchableOpacity style={[styles.trimTitle, styles.itemSpacing]} onPress={navigateToTaskForm}>
<Text style={styles.title}>{tri3}</Text>
</TouchableOpacity>
</View>
          <FlatList
            data={tasks}
            renderItem={renderItem}
            keyExtractor={(item) => item.MAT}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => setRefreshing(true) || getUsers().then(() => setRefreshing(false))}
                colors={["#78e08f"]}
                progressBackgroundColor="#0a3d62"
              />
            }
          />
        </>
      ) : (
        <View style={styles.centeredMessage}>
          <Text style={styles.messageText}>
            Esta opción no está disponible, regularizar las obligaciones con la institución
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    width: "90%",
    alignSelf: 'center', // Center the content horizontally
  },
  buttonContainer: {
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#007BFF', // Color de fondo para el botón, ajústalo según tu diseño
    padding: 10, // Espaciado interno del botón
    borderRadius: 5, // Bordes redondeados del botón
    alignItems: 'center', // Alinea el texto del botón al centro
  },
  buttonText: {
    color: 'black', // Aquí estableces el color del texto a negro
    fontSize: 18, // Tamaño del texto
  },
  centeredMessage: {
    flex: 1,
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center', // Center the content horizontally
  },
  messageText: {
    color: 'black',
    fontSize: 18, // Large text
    textAlign: 'center', // Center text horizontally
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },
  matTitle: {
    flex: 0.65,  // 50% width
    backgroundColor: "#A3A5A5",
    padding: 6,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trimTitle: {
    flex: 0.1,  // 50% width
    backgroundColor: "#A3A5A5",
    padding: 6,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default CalList;
