import React, { useEffect, useState } from "react";
import { Text, View} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import {  getMat } from "../api";

const MatList = (codigo) => {
  const [tasks, setTasks] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const isFocused = useIsFocused();
  const codalu=codigo.id;
  console.log('MatList')
  const getMates = async () => {
    try {
      const tasks = await getMat(codalu);
      setTasks(tasks);
    } catch (error) {
      console.log(error);
    }
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await getMates();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    getMates();
    console.log("called");
    console.log(tasks);
  }, [isFocused]);


  return (
    
    <View>
      <Text>Materia: {materia}</Text>
      <Text>Motivo:</Text>
    </View>
  );
};

export default MatList;
