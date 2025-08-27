import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Alert, RefreshControl, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { getCitas } from "../api";
import EntreItem from "./EntreItem";

const EntreList = ({ id, title }) => {
  const [tasks, setTasks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const getRegs = async () => {
    try {
      const loadedTasks = await getCitas(id);
      setTasks(loadedTasks);
      console.log(loadedTasks);
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

  const renderItem = ({ item }) => <EntreItem task={item} />;

  const handleAddPress = () => {
    navigation.navigate('Citas', { title, id });
  };
  
  return (
    <SafeAreaView style={{ flex: 1, width: "95%" }}>
      <TouchableOpacity style={styles.button} onPress={handleAddPress}>
        <Text style={styles.buttonText}>AÑADIR ENTREVISTA</Text>
      </TouchableOpacity>
      {tasks.length === 0 ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 20 }}>No existen entrevistas.</Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item) => item.CODSER.toString()} // Usar una clave única
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

const styles = StyleSheet.create({
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

export default EntreList;
