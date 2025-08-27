import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getAcc, getConf, getusoToken } from "../api";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  BackHandler,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../components/Logo';
import ItemComponent from '../components/ItemComponent';

const PasswordManager = ({ navigation, route }) => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [notificationData, setNotificationData] = useState(route.params?.notificationData || null);
  const [tasks, setTasks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const getConfigura = async () => {
    try {
      const tasks = await getConf('Edu');
      if (tasks.length > 0) {
        setTasks(tasks[0]); // Asegurarse de que solo hay un registro
      } else {
        setTasks(null);
      }
    } catch (error) {
      //console.log('aqui',error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = async (item, token) => {
    console.log('user', item.id, item.pass, item.phone, item.devicetoken, item.nivel);

    await getConfigura();
    //console.log('user2', item.id, item.pass, item.phone, item.devicetoken, item.nivel);
    if (tasks?.contoken !== "1") {
      try {
        console.log(item.id, item.devicetoken);
        const response = await getusoToken(item.id, item.devicetoken);
        //Alert.alert("Información1", response);
        console.log(response);
        if (response.length !== 0) {
          const res1 = await getAcc(item.id);
          if (res1.length === 0) {
            Alert.alert("Información", "No se encontraron datos de la cuenta");
            return;
          }

          const vpago1 = res1[0].pago1;
          const vpago2 = res1[0].pago2;
          const vpago3 = res1[0].pago3;
          const vpago4 = res1[0].pago4;
          const vpago5 = res1[0].pago5;
          const vpago6 = res1[0].pago6;
          const vpago7 = res1[0].pago7;
          const vpago8 = res1[0].pago8;
          const vpago9 = res1[0].pago9;
          const vpago10 = res1[0].pago10;
          const vnivel = res1[0].nivel;

          if (res1[0].pass === item.pass) {
            navigation.navigate("Menu", {
              title: res1[0].nombre,
              id: res1[0].codalu,
              token: item.devicetoken,
              notificationId: notificationData?.notificationId,
              userId: notificationData?.userId,
              nivel: res1[0].nivel
            });
            loadData();
          } else {
            Alert.alert("Error", "Contraseña incorrecta");
          }
        } else {
          Alert.alert("Advertencia", tasks?.contoken);
        }
      } catch (error) {
        console.error("Error al obtener la información de la cuenta:", error);
        Alert.alert("Error", tasks?.contoken);
      }
    } else {
      try {
        const res1 = await getAcc(item.id);
        if (res1.length === 0) {
          Alert.alert("Información", "No se encontraron datos de la cuenta");
          return;
        }

        const vpago1 = res1[0].pago1;
        const vpago2 = res1[0].pago2;
        const vpago3 = res1[0].pago3;
        const vpago4 = res1[0].pago4;
        const vpago5 = res1[0].pago5;
        const vpago6 = res1[0].pago6;
        const vpago7 = res1[0].pago7;
        const vpago8 = res1[0].pago8;
        const vpago9 = res1[0].pago9;
        const vpago10 = res1[0].pago10;
        const vnivel = res1[0].nivel;

        if (res1[0].pass === item.pass) {
          navigation.navigate("Menu", {
            title: res1[0].nombre,
            id: res1[0].codalu,
            token: item.devicetoken,
            notificationId: notificationData?.notificationId,
            userId: notificationData?.userId,
            nivel: res1[0].nivel
          });
          loadData();
        } else {
          Alert.alert("Error", "Contraseña incorrecta");
        }
      } catch (error) {
        console.error("Error al obtener la información de la cuenta:", error);
        Alert.alert("Error", "No se pudo seleccionar el estudiante");
      }
    }
  };

  const handleEdit = (item) => {};

  const handleDelete = (itemId) => {
    deleteItem(itemId);
    setItems(items.filter((item) => item.id !== itemId));
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
  try {
    const itemsData = await AsyncStorage.getItem('passwordItems');
    if (itemsData !== null) {
      const parsedItems = JSON.parse(itemsData);
      setItems(parsedItems);

      if (parsedItems.length === 0) {
        navigation.replace("Registro"); // navegación directa
      }
    } else {
      navigation.replace("Registro"); // también si no hay datos almacenados aún
    }
  } catch (error) {
    console.log('Error loading data:', error);
  }
};

  const deleteItem = async (id) => {
    try {
      const updatedItems = items.filter((item) => item.id !== id);
      setItems(updatedItems);
      await AsyncStorage.setItem('passwordItems', JSON.stringify(updatedItems));
    } catch (error) {
      console.log('Error deleting data:', error);
    }
  };

  const login = () => {
    navigation.navigate("Registro");
  };

  const logout = () => {
    Alert.alert(
      "Cerrar la aplicación",
      "¿Estás seguro de que deseas salir?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Aceptar",
          onPress: () => BackHandler.exitApp()
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Logo>
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Salir</Text>
        </TouchableOpacity>
      </Logo>
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.addButton} onPress={login}>
          <Text style={styles.addButtonText} allowFontScaling={false}>Añadir estudiante.</Text>
        </TouchableOpacity>
      </View>
      {items.length === 0 ? (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>Debe añadir un estudiante haciendo click en el botón</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ItemComponent
              item={item}
              onSelect={handleSelect}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isHighlighted={notificationData?.userId === item.id}
              token={item.devicetoken} // Pasar el token al ItemComponent
            />
          )}
        />
      )}
      {selectedItem && (
        <View style={styles.selectedItemContainer}>
          <Text style={styles.selectedItemText}>Elemento seleccionado: {selectedItem.title}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 5,
  },
  inputContainer: {
    marginBottom: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 1,
  },
  addButton: {
    backgroundColor: '#2897f4',
    padding: 10,
    height: 48,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  item: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 15,
  },
  itemSubText: {
    fontSize: 13,
    color: '#666',
    paddingTop: 5,
  },
  noDataContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDataText: {
    fontSize: 15,
    textAlign: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  highlightedText: {
    fontWeight: 'bold',
    color: 'red',
  },
  selectedItemContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  selectedItemText: {
    fontSize: 16,
  },
  logoutButton: {
    padding: 10,
    backgroundColor: '#f00',
    borderRadius: 5,
    marginLeft: 10,
    height: 48, // Cambiar de 39dp a 48dp
    justifyContent: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  }
});

export default PasswordManager;
