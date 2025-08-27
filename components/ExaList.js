import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, RefreshControl,Text, View,TouchableOpacity, StyleSheet} from "react-native";
import { useIsFocused } from "@react-navigation/native";

import { getExas } from "../api";
import ExaItem from "./ExaItem";

const ExaList = (codigo) => {
  const esp = '-';
  const [tasks, setTasks] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const isFocused = useIsFocused();
    const codalu=codigo.id;
  //console.log('ExaList')
  //console.log(codalu)

  const [expanded, setExpanded] = useState({});

const toggleExpand = (fecha) => {
  setExpanded(prev => ({...prev, [fecha]: !prev[fecha]}));
};

const getUsers = async () => {
  try {
    const tasks = await getExas(codalu);
    const groupedTasks = tasks.reduce((acc, task) => {
      // Creamos una clave única combinando fecha y día
      const fechaDiaKey = `${task.dia} ${task.fecha}`;
      (acc[fechaDiaKey] = acc[fechaDiaKey] || []).push(task);
      return acc;
    }, {});

    const groupedTasksArray = Object.entries(groupedTasks).map(([fechaDia, tasks]) => {
      // Separamos la fecha y el día nuevamente para pasarlos como propiedades separadas
      const [fecha, dia] = fechaDia.split('-');
      return { fecha, dia, tasks };
    });
    setTasks(groupedTasksArray);
  } catch (error) {
    console.log(error);
  }
};

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await getUsers();
    setRefreshing(false);
  }, []);

  
  useEffect(() => {
    getUsers();
  }, [isFocused]);

  // Renderizado de Items
  const renderItem = ({ item }) => {
    return (
      <View>
        <View style={styles.fechaContainer}>
          <TouchableOpacity onPress={() => toggleExpand(item.fecha)}>
            <Text style={styles.fechaText}>{item.fecha}  </Text>
          </TouchableOpacity>
        </View>
        {expanded[item.fecha] && item.tasks.map((task, index) => (
          <View style={styles.actItemContainer} key={task.codser + "-" + item.fecha + "-" + index}>
            <ExaItem
              task={task}
              expanded={expanded[item.fecha]}
            />
          </View>
        ))}
      </View>
    );
  };
  
  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 10 }}>
        
        {tasks.length > 0 ? (
          <FlatList
            data={tasks}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.CODSER + "-" + index}
            ListHeaderComponent={
              <Text style={styles.titulo}>Exámenes y tareas</Text>
            }
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={["#78e08f"]}
                progressBackgroundColor="#0a3d62"
              />
            }
          />
        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>No existen actividades</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
  
};
const styles = StyleSheet.create({
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 5,
    color: '#000',
  },
  
  fechaContainer: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#2897f4",
    padding: 6,
    borderRadius: 5,
    // Otros estilos que quieras añadir
  },
  fechaText: {
    fontSize: 16,
    fontWeight: 'bold',
    // Otros estilos para el texto de la fecha
  },
  actItemContainer: {
    backgroundColor: "#989898",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#2897f4", // Fondo blanco para el botón, ajusta según necesidad
    padding: 5,
    marginVertical: 10,
    height:48
  },
  buttonText: {
    color: "#000000", // Texto negro
    fontSize: 20,
  }  

});
export default ExaList;
