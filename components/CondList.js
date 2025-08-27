import React, { useEffect, useState, useRef } from "react";
import { FlatList, SafeAreaView, Alert, RefreshControl, Text, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { getConds } from "../api";
import CondItem from "./CondItem";

const CondList = (codigo) => {
  const [tasks, setTasks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  console.log("CondList", codigo);
  const codalu = codigo.id;
  const ultimaMateriaFecha = useRef({ materia: "", fecha: "" });

  const getRegs = async () => {
    try {
      const loadedTasks = await getConds(codalu);
      setTasks(loadedTasks);
      ultimaMateriaFecha.current = { materia: "", fecha: "" }; // Reiniciar para nuevas cargas
    } catch (error) {
      Alert.alert("Error", "Ha ocurrido un error al cargar los datos. Por favor, inténtelo de nuevo más tarde.");
      console.error(error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getRegs();
    setRefreshing(false);
  };

  useEffect(() => {
    getRegs();
  }, [isFocused]);

  const renderItem = ({ item }) => {
    const mostrarMateriaYFecha = item.MATERIA !== ultimaMateriaFecha.current.materia || item.FECHA !== ultimaMateriaFecha.current.fecha;
    ultimaMateriaFecha.current = { materia: item.MATERIA, fecha: item.FECHA };

    return <CondItem task={item} mostrarMateriaYFecha={mostrarMateriaYFecha} />;
  };

  return (
    <SafeAreaView style={{ flex: 1, width: "100%" }}>
      {tasks.length === 0 ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 20 }}>No existen observaciones.</Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item, index) => `task-${index}`}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#78e08f"]}
              progressBackgroundColor="#0a3d62"
            />
          }
        />
      )}
    </SafeAreaView>
  );
};

export default CondList;
