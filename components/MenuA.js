import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function MenuA() {
  return <Image source={require('../assets/opciones/estadisticas.png')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 140,
    height: 120,
    marginBottom: 8,
  },
})
