import React from "react";
import { useNavigation } from "@react-navigation/native";
import DetailItem from "./DetailItem";

const Acitas = ({ route }) => {
  const navigation = useNavigation();
  const {title, id } = route.params;
  
  console.log('Citas',title)
  valumno=title;
  vcodalu=id;

  return (
      <DetailItem title={title} id={id} navigation={navigation} /> 
  )
}
export default Acitas;
