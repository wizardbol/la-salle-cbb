import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PagosItem = ({ item }) => {

  return (
    <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>{item.nombre}</Text>
        <Text style={styles.itemTitle}>{item.fecha}</Text>
    </View>
  );
};

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
  itemTitle: {
    color: "#ffffff",
    fontSize: 19,
  },
});
export default PagosItem;
