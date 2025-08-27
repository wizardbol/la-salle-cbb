import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, BackHandler } from 'react-native';
import Layout from "../components/Layout";
import CalList from "../components/CalList";
import { useNavigation } from '@react-navigation/native';
import { getConf } from "../api";

const Calificaciones = ({ route }) => {
  const { title, id } = route.params;
  const navigation = useNavigation();
  const valumno = title;
  const vcodalu = id;

  const [tasks, setTasks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const Regresar = () => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      //navigation.search();
      navigation.goBack();
      return true;
      /*if (navigation.search()) {
        BackHandler.exitApp();
        return true;
      } else {
        BackHandler.exitApp();
        return true;
      }*/
    });
    
  };

  const getConfigura = async () => {
    try {
      const tasks = await getConf('Edu');
      if (tasks.length > 0) {
        setTasks(tasks[0]); // Asegurarse de que solo hay un registro
      } else {
        setTasks(null);
      }
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getConfigura();
  }, []);

  if (loading) {
    return <Text>Cargando...</Text>;
  }

  if (error) {
    return <Text>Error al cargar las notas</Text>;
  }

  return (
    <Layout>
      {tasks?.vernotas === "1" ? (
        <>
          <CalList id={vcodalu} title={title}/>
          {/*
          <TouchableOpacity onPress={Regresar} style={styles.button}>
            <Text style={styles.buttonText}>Volver</Text>
          </TouchableOpacity>
        */}
        </>
      ) : (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>{tasks?.vernotas}</Text>
        </View>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center'
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  messageContainer: {
    margin: 20,
    padding: 15,
    backgroundColor: '#F8D7DA',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#F5C6CB',
  },
  messageText: {
    color: '#721C24',
    fontWeight: 'bold',
    fontSize: 20,
  }
});

export default Calificaciones;
