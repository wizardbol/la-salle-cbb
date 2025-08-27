import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, SafeAreaView, Alert, RefreshControl } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { getAcc } from "../api";

import PagosItem from "./PagosItem";

const PagosList = ({ id, title }) => {
  const isFocused = useIsFocused();
  const [pagosarr, setPagosarr] = useState([]);

  const getPagos = async () => {
    try {
      const res1 = await getAcc(id);
      console.log('Pagos',res1)

      const pagos = [];
      for (let i = 1; i <= 10; i++) {
        const pago = res1[0][`pago${i}`];
        const cuota = {
          nombre: `Cuota ${i}`,
          fecha: pago,
          id: `00${i}`,
        };
        pagos.push(cuota);
      }
      setPagosarr(pagos);
      console.log(pagos);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPagos();
  }, [isFocused]);

  return (
    <SafeAreaView style={{ flex: 1, width: "90%" }}>
      <FlatList
        data={pagosarr}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <PagosItem item={item} />}
      />
    </SafeAreaView>
  );
};

// Estilos...
const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#333333",
    padding: 20,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5,
  },
   Texto: {
    color: "#ffffff",
    fontSize: 20,
  },
   Textop:{
    backgroundColor: "#00bfff",
    padding: 7, 
    borderRadius: 5 
  }
 
});
export default PagosList;


