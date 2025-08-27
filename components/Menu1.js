import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Menu1() {
  return <Image source={require('../assets/opciones/Contenido-web.png')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
})
