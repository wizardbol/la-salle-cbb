import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { getToken } from "../utils/actionsfire";
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values'
import { size } from "lodash";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  BackHandler
} from "react-native";
import { getpas, postUser } from "../api";
import Logoestu from "../components/Logoestu";
import '../global'

export default function Loginpru({ navigation }) {
  const [statusMessage, setStatusMessage] = useState('');
  const [items, setItems] = useState([]);
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [fcmToken, setFcmToken] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const showAlert = (message, duration = 5000) => {
    alert(message);
    setTimeout(() => {}, duration);
  };

  const validarDatos = (user1) => {
    let mensajeError = "";

    if (size(user) < 6 || size(password) < 6) {
      mensajeError = "Usuario o contraseña inválidos";
    }

    if (Platform.OS === 'android') {
      if (size(phone) < 6) {
        mensajeError = "Número de teléfono requerido";
      } else if (![user1.phone1, user1.phone2, user1.phone3].includes(phone)) {
        mensajeError = "El número no coincide";
      }
    }

    return mensajeError;
  };

  const loadData = async () => {
    try {
      const itemsData = await AsyncStorage.getItem('passwordItems');
      if (itemsData !== null) {
        setItems(JSON.parse(itemsData));
      }
    } catch (error) {
      console.log('Error loading data:', error);
      showAlert('Error al cargar datos: ' + error.message);
    }
  };

  const saveData = async (usuario) => {
    try {
      const newItem = usuario;
      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      setStatusMessage('SaveDataAsync...');
      await AsyncStorage.setItem('passwordItems', JSON.stringify(updatedItems));
    } catch (error) {
      alert('Error saving data:', error);
    }
  };

  const saveUsuario = async (usuario) => {
    try {
      setStatusMessage('postUser...');
      await postUser(usuario);
    } catch (error) {
      alert('Error GRABANDO datos:', error);
    }
  };

  const login = async () => {
    setStatusMessage('Iniciando sesión...');
    console.log('user:', user);
    try {
      const res1 = await getpas(user);
      const user1 = res1[0];
      console.log('res1' + user1.codalu + user1.nivel);
      if (!user1.codalu) {
        alert('Usuario no encontrado');
        return;
      }

      const token = await getToken();
      setFcmToken(token);
      console.log('gettokenb:', token);

      const usuario = {
        id: user1.codalu,
        nombre: user1.NOMBRE,
        pass: user1.pass,
        phone: Platform.OS === 'ios' ? 'ios' : phone,
        devicetoken: token,
        nivel: user1.nivel,
        nivell: user1.nivell
      };

      const mensajeError = validarDatos(user1);
      setStatusMessage('col usuario...' + mensajeError);
      console.log('mesaje:' + mensajeError);

      if (mensajeError) {
        alert(mensajeError);
        return;
      }

      setStatusMessage('Grabando usuario...');
      saveData(usuario);
      setStatusMessage('Storage usuario...');
      saveUsuario(usuario);

      navigation.navigate("Estudiantes", {
        title: user1.NOMBRE,
        id: user1.codalu,
      });

    } catch (error) {
      console.log('Error en login:', error);
      showAlert('Error durante el inicio de sesión', 5000);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Logoestu />
        <Input placeholder="Usuario" color="black" onChangeText={setUser} />
        {Platform.OS === 'android' && (
          <Input placeholder="Celular Padre o Madre" color="black" onChangeText={setPhone} />
        )}
        <Input placeholder="Contraseña" color="black" secureTextEntry onChangeText={setPassword} />

        <TouchableOpacity style={styles.loginBtn} onPress={login}>
          <Text style={styles.text}> AGREGAR </Text>
        </TouchableOpacity>

        {items.length > 0 ? (
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate("Estudiantes")}>
            <Text style={styles.text}> VOLVER </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.exitBtn} onPress={() => BackHandler.exitApp()}>
            <Text style={styles.text}> SALIR </Text>
          </TouchableOpacity>
        )}

        <Text style={styles.tokenLabel}>Token obtenido:</Text>
        <Text selectable style={styles.tokenValue}>{fcmToken || 'Token no disponible aún'}</Text>

        <Text setErrorUser />
      </View>
    </SafeAreaView>
  );
}

const Input = ({ placeholder, color = "#003f5c", secureTextEntry = false, onChangeText }) => (
  <View style={styles.inputView}>
    <TextInput
      style={styles.TextInput}
      placeholder={placeholder}
      color={color}
      placeholderTextColor={color}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    alignItems: 'center',
    paddingTop: 10,
    marginBottom: 1,
    marginTop: -10,
  },
  image: {
    alignItems: 'center',
    marginBottom: 1,
  },
  inputView: {
    backgroundColor: "#E6E6E6",
    borderRadius: 10,
    width: "80%",
    height: 48,
    marginBottom: 1,
    alignItems: "center",
    topmargin: 2
  },
  TextInput: {
    height: 50,
    width: "80%",
    flex: 1,
    padding: 10,
    marginLeft: 20,
    fontSize: 18,
  },
  loginBtn: {
    backgroundColor: '#3374FF',
    width: "80%",
    height: 48,
    padding: 5,
    borderRadius: 10,
    marginBottom: 2,
    marginTop: 2,
  },
  backBtn: {
    backgroundColor: '#aaa',
    width: "80%",
    height: 48,
    padding: 5,
    borderRadius: 10,
    marginBottom: 5,
    marginTop: 10,
  },
  exitBtn: {
    backgroundColor: '#f00',
    width: "80%",
    height: 48,
    padding: 5,
    borderRadius: 10,
    marginBottom: 5,
    marginTop: 10,
  },
  text: {
    textAlign: 'center',
    color: 'black',
    fontSize: 18,
  },
  tokenLabel: {
    fontSize: 14,
    marginTop: 10,
    color: '#444',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tokenValue: {
    fontSize: 12,
    color: '#666',
    paddingHorizontal: 20,
    textAlign: 'center',
  },
});
