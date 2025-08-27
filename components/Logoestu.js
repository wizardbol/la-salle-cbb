import React from 'react';
import { Image, StyleSheet } from 'react-native';

export default function Logoestu() {
  return (
    <Image 
      source={require('../assets/iconos/estudiante2.png')} 
      style={styles.image}
      resizeMode="contain" // Agregar esta línea
    />

  );
}

const styles = StyleSheet.create({
  image: {
   width: 30,
    height: 30,
    marginBottom: 0,
    marginTop: 0,
    // Puede eliminar o ajustar estas dimensiones según sea necesario
  },
});
