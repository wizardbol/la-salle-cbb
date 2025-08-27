// Search.js
import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Linking, StyleSheet, ScrollView, Modal, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Menu1 from '../components/Menu1';
import Menu2 from '../components/Menu2';
import Menu3 from '../components/Menu3';
import Menu4 from '../components/Menu4';
import Menu5 from '../components/Menu5';
import Menu6 from '../components/Menu6';
import Menu7 from '../components/Menu7';
import Menu8 from '../components/Menu8';
import { getUseAviso } from "../api";

const Search = ({ title, id, token, notificationData = {} }) => {
  const navigation = useNavigation();
  const [refresh, setRefresh] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const getUsoelAviso = async () => {
    try {
      const tasks = await getUseAviso(id, token);
      if (tasks === 0) {
        setShowPopup(true);
        setShowNotification(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsoelAviso();
  }, []);

  const navigateTo = (screen) => {
    navigation.navigate(screen, {
      title,
      id,
      token,
      notificationId: notificationData.notificationId,
      userId: id
    });
  };

  const cale = async () => {
    try {
      await Linking.openURL("https://www.lasallecbb.edu.bo/index.php?option=com_content&view=article&id=50&Itemid=120");
    } catch (error) {
      console.error("Error al abrir el enlace:", error);
    }
  };

  const renderMenuButton = (onPress, label, MenuComponent, showNoti) => (
    <TouchableOpacity style={styles.menuButton} onPress={onPress}>
      <View style={styles.menuButtonContent}>
        <Text style={styles.searchTitle}>{label}</Text>
        {showNoti && (
          <Image
            source={require('../assets/iconos/campana.png')}
            style={styles.notificationIcon}
          />
        )}
      </View>
      <MenuComponent title={title} id={id} />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.row}>
        {renderMenuButton(() => navigateTo("Comunicado"), 'Comunicado', Menu1, showNotification || notificationData.Comunicado)}
        {renderMenuButton(() => navigateTo("Conducta"), 'Conducta', Menu2, notificationData.Conducta)}
      </View>
      <View style={styles.row}>
        {renderMenuButton(() => navigateTo("Calificaciones"), 'Calificaciones', Menu3)}
        {renderMenuButton(() => navigateTo("Obligaciones"), 'Obligaciones', Menu4)}
      </View>
      <View style={styles.row}>
        {renderMenuButton(() => navigateTo("Actividades"), 'Actividades', Menu5)}
        {renderMenuButton(() => navigateTo("Examenes"), 'Examenes', Menu7)}
      </View>
      <View style={styles.row}>
        {renderMenuButton(() => navigateTo("Entrevista"), 'Entrevistas', Menu8)}
        {renderMenuButton(cale, 'Calendario', Menu6)}
      </View>

      <Modal
        visible={showPopup}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowPopup(false)}
      >
        <View style={styles.popupContainer}>
          <View style={styles.popup}>
            <Text style={styles.popupText}>Revisar comunicado</Text>
            <TouchableOpacity onPress={() => setShowPopup(false)}>
              <Text style={styles.popupButton}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  menuButton: {
    flex: 0.48,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  menuButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  notificationIcon: {
    marginLeft: 8,
  },
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  popupText: {
    fontSize: 18,
    marginBottom: 20,
  },
  popupButton: {
    fontSize: 16,
    color: 'blue',
  },
});

export default Search;