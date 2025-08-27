import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  RefreshControl,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Linking,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import * as RootNavigation from '../screens/RootNavigation';
import { getAviso } from "../api";
import ComItem from "./ComItem";

const ComList = ({ id, title, token }) => {
  const [tasks, setTasks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  console.log('Token: ', token);
  const openURL = () => {
    Linking.openURL("https://www.lasallecbb.edu.bo/index.php?option=com_content&view=article&id=132&Itemid=232");
  };

  const getUsers = async () => {
    try {
      const tasks = await getAviso(id, 1);
      setTasks(tasks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getUsers();
    }
  }, [isFocused]);

  const renderItem = ({ item }) => (
    <ComItem 
      task={item} 
      id={id} 
      token={token} 
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centeredButton}>
        <TouchableOpacity onPress={openURL} style={styles.button}>
          <Text style={styles.buttonText}>Comunicados de dirección</Text>
        </TouchableOpacity>
      </View>
      {tasks.length > 0 ? (
        <>
          <View style={styles.buttonContainer}></View>
          <FlatList
            data={tasks}
            renderItem={renderItem}
            keyExtractor={(item) => item.TITULO}
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
            No existen comunicados
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
    width: "100%",
    alignSelf: 'center',
  },
  centeredButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  buttonContainer: {
    marginVertical: 10,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'black',
    alignItems: 'center',
    fontSize: 20,
  },
  centeredMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default ComList;
