import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, Linking, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { postuseavi } from "../api";

const ComItem = ({ task, id, token }) => {
  const navigation = useNavigation();

  const saveUsuario = async (usuario) => {
    try {
      const res1 = await postuseavi(usuario);
    } catch (error) {
      alert('Error GRABANDO datos:', error);
    }
  };

  const navigateToTaskForm = async () => {
    const usuario = {
      id: id,
      devicetoken: token,
      codtit: `${task.CODTIT}`,
      serial: `${task.CODSER}`
    };

    console.log(`Saving usuario: ${JSON.stringify(usuario)}`);
    await saveUsuario(usuario);
    console.log(`Url1: ${task.MENSAJE}`);
    
    // Abre el URL después de guardar los datos
    if (task.URL1) {
      openLink(task.URL1);
    }
    
    // Descomentar esta línea si existe la pantalla 'TaskForm' y se desea navegar a ella
    // navigation.navigate('TaskForm', { id: studentId, token: token });
  };

  const openLink = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.error("No se puede abrir el enlace: ", url);
    }
  };

  const extractLink = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.match(urlRegex);
  };

  const messageLink = extractLink(task.MENSAJE);
  let messageBeforeLink = task.MENSAJE;
  let messageAfterLink = "";

  if (messageLink) {
    const linkIndex = task.MENSAJE.indexOf(messageLink[0]);
    messageBeforeLink = task.MENSAJE.substring(0, linkIndex);
    messageAfterLink = task.MENSAJE.substring(linkIndex + messageLink[0].length);
  }

  return (
    <View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.matItemLit} onPress={navigateToTaskForm}>
          
          <Text style={styles.itemText}>{task.FECHA}</Text>
          {task.VISTO === 1 && (
              <Image
                source={require('../assets/iconos/icono_ok.png')}
                style={styles.icon}
              />
            )}
          <Text style={styles.itemText}>{task.TITULO}</Text>
          <Text style={styles.itemText}>
           
            {messageBeforeLink}
            {messageLink && (
              <Text style={{ color: 'blue' }} onPress={() => openLink(messageLink[0])}>
                {messageLink[0]}
              </Text>
            )}
            {messageAfterLink}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },
  matItemLit: {
    flex: 1,
    backgroundColor: "#EAEDED",
    padding: 6,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    color: "black",
    fontSize: 17,
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
});

export default ComItem;
