import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Check() {
  return <Image source={require('../assets/iconos/check_ok_accept_apply_1582.png')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 30,
    height: 30,
    marginBottom: 8,
  },
})
