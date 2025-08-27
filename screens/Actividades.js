import React from 'react'
import ActList from "../components/ActList";

const Actividades = ({  route }) => {
  const {title, id } = route.params;
  
  console.log('Actividades',title)
  valumno=title;
  vcodalu=id;
  return (
      <ActList id={vcodalu} /> 
  )
}

export default Actividades;
