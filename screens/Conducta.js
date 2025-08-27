import React from 'react'
import CondList from "../components/CondList";

const Conducta = ({  route }) => {
  const {title, id } = route.params;
  //console.log('Conducta',title)
  valumno=title;
  vcodalu=id;
  return (
      <CondList id={vcodalu} /> 
  )
}

export default Conducta;
