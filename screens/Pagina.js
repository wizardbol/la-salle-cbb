import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Linking } from 'react-native';

const Pagina = () => {
  useEffect(() => {
    const openURL = async () => {
      const url = "https://www.lasallecbb.edu.bo/index.php?option=com_content&view=article&id=10&catid=2&Itemid=130/";
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.error("No se puede abrir la URL: " + url);
      }
    };

    openURL();
  }, []);

  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Pagina;
