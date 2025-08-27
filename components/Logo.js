import React from 'react'
import { View, Image, StyleSheet } from 'react-native'

const Logo = ({ children }) => {
  return(
    <View style={styles.container}>
    <Image source={require('../assets/logols.png')} style={styles.image} />
    {children}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
});
export default Logo;