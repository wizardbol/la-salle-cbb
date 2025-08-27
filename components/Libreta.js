import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Libreta() {
  return <Image source={require('../assets/NotasFer.png')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 550,
    height: 340,
    marginBottom: 8,
  },
})
