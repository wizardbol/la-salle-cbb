import React from 'react';
import EntreList from "../components/EntreList";

const Entrevista = ({ route }) => {
  const { title, id } = route.params;

  console.log('Entrevista:', title, id);

  return <EntreList id={id} title={title} />;
};

export default Entrevista;
