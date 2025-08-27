import React from "react";
import { useNavigation } from "@react-navigation/native";
import DetailItem from "../components/DetailItem";

const Citas = ({ route }) => {
  const navigation = useNavigation();
  const { title, id } = route.params;

  console.log('Citas:', title, id);

  return <DetailItem title={title} id={id} navigation={navigation} />;
};

export default Citas;

