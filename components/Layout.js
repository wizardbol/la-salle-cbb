import React from "react";
import { View, StatusBar, StyleSheet,Text } from "react-native";

const Layout = ({ children }) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#222f3e" />
      {children}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width : '100%',
    marginTop: 10,
    paddingTop: 10,
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
  }
});

export default Layout;
