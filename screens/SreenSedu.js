import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Layout from "../components/Layout";
import BolSedu from "../components/BolSedu";

const SreenSedu = ({  route }) => {
  return (
    <Layout>
      <Text style={styles.Texto}>Boletin de SEDUCA</Text>
      <BolSedu id={route.params?.id} />
   </Layout>
  )
}

export default SreenSedu

const styles = StyleSheet.create({
   Texto: {
    color: "#ffffff",
    fontSize: 20,
  },
   
 
});