import React, { useEffect, useState } from "react";
import { TouchableOpacity, FlatList, SafeAreaView, RefreshControl, View, Text, StyleSheet, BackHandler, Image } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { getNotaIndi } from "../api";

const Detalle = ({ route }) => {
  const { id, title, codmat, con, mat } = route.params;
  console.log('Detalle');
  const [tasks, setTasks] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const navigateToTaskForm = () => {};

  const getUsers = async () => {
    try {
      const task = await getNotaIndi(`${id}/${con}/${codmat}`);
      if (task && task.length > 0) {
        setTasks(task[0]); // Utilizar solo el primer registro
      } else {
        setTasks(null); // Establecer null si no hay datos
      }
      console.log(task[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [isFocused]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate("Calificaciones", { title: title, id: id });
      return true;
    });

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (!isFocused) {
      setTasks({}); // Limpiar los datos cuando la pantalla no está enfocada
    }
  }, [isFocused]);

  const indi = [];
  if (tasks) {
    for (let i = 1; i <= 33; i++) {
      const indiKey = `INDI${i}`;
      const camKey = `CAM${i}`;
      if (tasks[indiKey] !== "" || tasks[camKey] !== 0) {
        indi.push({
          indi: tasks[indiKey],
          cam: tasks[camKey]
        });
      }
    }
  }

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <TouchableOpacity style={[styles.matItem, styles.itemSpacing, item.indi && item.indi.startsWith('Promedio') ? styles.promedioBackground : null]} onPress={navigateToTaskForm}>
        <Text style={styles.itemText}>{`${item.indi}`}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.notaItem, styles.itemSpacing, item.indi && item.indi.startsWith('Promedio') ? styles.promedioBackground : null]} onPress={navigateToTaskForm}>
        <Text style={styles.notaText}>{`${item.cam}`}</Text>
      </TouchableOpacity>
    </View>
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Calificaciones", { title: title, id: id })}>
          <Image 
            source={require('../assets/iconos/arrow.png')} 
            style={{ width: 20, height: 20 }} 
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.materiaContainer}>
          <Text style={styles.materiaText}>{`MATERIA: ${mat}`}</Text>
        </View>
        <Text>.</Text>
      </View>
      {!tasks || indi.length === 0 ? (
        <Text style={styles.noDataText}>No hay notas a detalle</Text>
      ) : (
        <FlatList
          data={indi}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() =>
                setRefreshing(true) ||
                getUsers().then(() => setRefreshing(false))
              }
              colors={["#78e08f"]}
              progressBackgroundColor="#0a3d62"
            />
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    width: "90%",
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  conItem: {
    flex: 0.16,
    backgroundColor: "#2897f4",
    padding: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 17,
  },
  notaText: {
    fontSize: 17,
  },
  matItem: {
    flex: 0.80,
    backgroundColor: "#EAEDED",
    padding: 6,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notaItem: {
    flex: 0.20,
    backgroundColor: "#EAEDED",
    padding: 6,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemSpacing: {
    marginRight: 4,
  },
  promedioBackground: {
    backgroundColor: "#3498db",
  },
  camText: {
    color: "#808080",
  },
  materiaContainer: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  materiaText: {
    fontSize: 17,
    color: "white",
  },
  noDataText: {
    fontSize: 25,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});

export default Detalle;
