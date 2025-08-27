import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet, FlatList, SafeAreaView, Alert, RefreshControl } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import { deleteTask, getPags } from "../api";
import PagosItem from "./PagosItem";

const PagosList = (codigo) => {
  const [tasks, setTasks] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const isFocused = useIsFocused();
  const codalu=codigo.id
  console.log('pagos')
  console.log(codalu)
  
  const getUsers = async () => {
    try {
      const tasks = await getPags(codalu);
      setTasks(tasks);

    } catch (error) {
      console.log(error);
    }
  };
  const pagosarr =[
    {
      nombre: 'Cuota 1',
      fecha: tasks.PAGO1,
      id: '001',
    },
    {
      nombre: 'Cuota 2',
      fecha: tasks.PAGO2,
      id: '002',
    },
    {
      nombre: 'Cuota 3',
      fecha: tasks.PAGO3,
      id: '003',
    },
    {
      nombre: 'Cuota 4',
      fecha: tasks.PAGO4,
      id: '004',
    },
    {
      nombre: 'Cuota 5',
      fecha: tasks.PAGO5,
      id: '005',
    },
    {
      nombre: 'Cuota 6',
      fecha: tasks.PAGO6,
      id: '006',
    },
    {
      nombre: 'Cuota 7',
      fecha: tasks.PAGO7,
      id: '007',
    },
    {
      nombre: 'Cuota 8',
      fecha: tasks.PAGO8,
      id: '008',
    },
    {
      nombre: 'Cuota 9',
      fecha: tasks.PAGO9,
      id: '009',
    },
    {
      nombre: 'Cuota 10',
      fecha: tasks.PAGO10,
      id: '010',
    },
  ]
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    // wait(2000).then(() => setRefreshing(false));
    await getUsers();
    setRefreshing(false);
  }, []);

  const handleDelete = (id) => {
    Alert.alert("Detalle Task", "Are you sure you want to detalle? the task", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Ok",
        /* onPress: async () => {
          await deleteTask(id);
          await getUsers();
        }, */
      },
    ]);
  };

  useEffect(() => {
    getUsers();
    console.log("called");
  }, [isFocused]);

  
  return (
    <SafeAreaView style={{ flex: 1, width: "90%" }}>
      <FlatList
        data={pagosarr}
        keyExtractor={(item) => item.id}
        renderItem={({item,index}) => <PagosItem item = {item} />}
          />
        
      
    </SafeAreaView>

  );
};
const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#333333",
    padding: 20,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5,
  },
   Texto: {
    color: "#ffffff",
    fontSize: 20,
  },
   Textop:{
    backgroundColor: "#00bfff",
    padding: 7, 
    borderRadius: 5 
  }
 
});
export default PagosList;
