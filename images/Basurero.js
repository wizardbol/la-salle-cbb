import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Basurero() {
  return <Image source={require('../assets/iconos/basurero.png')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 30,
    height: 30,
    marginBottom: 8,
  },
})
