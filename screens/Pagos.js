import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Layout from "../components/Layout";
import PagosList from "../components/PagosList";

const Pagos = ({  route }) => {
  const {title, id } = route.params;
  //const navigation = useNavigation();
  
  console.log('Pagos',title)
  valumno=title;
  vcodalu=id;
  return (
    <Layout>
      <Text style={styles.Texto}>OBLIGACIONES PARA CON LA INSTITUCION</Text>
      <PagosList id={vcodalu} title={title}/>
   </Layout>
  )
}

export default Pagos

const styles = StyleSheet.create({
   Texto: {
    color: "#ffffff",
    fontSize: 20,
  },
   
 
});