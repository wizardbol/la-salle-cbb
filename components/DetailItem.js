import React, { useEffect, useState } from "react";
import {
  Text, View, TextInput, StyleSheet, TouchableOpacity, ScrollView,
  KeyboardAvoidingView, Dimensions, Platform
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { getMat, getAte, postCita } from "../api";
import { Picker } from "@react-native-picker/picker";
import { size } from "lodash";

const screenWidth = Dimensions.get('window').width;

const DetailItem = ({ title, id, navigation }) => {
  const [tasks, setTasks] = useState([]);
  const isFocused = useIsFocused();
  const [motivo, setMotivo] = useState("");
  const [atenciones, setAtenciones] = useState([]);
  const [selectedAtencion, setSelectedAtencion] = useState(null);
  const [errorUser, setErrorUser] = useState("");
  const [selectedMateria, setSelectedMateria] = useState(null);
  const [selectedMateriaNombre, setSelectedMateriaNombre] = useState("");

  useEffect(() => {
    const fetchInitialData = async () => {
      const tasksFromApi = await getMat(id);
      setTasks(tasksFromApi);
    };

    if (isFocused) {
      fetchInitialData();
    }
  }, [isFocused]);

  useEffect(() => {
    const fetchAtenciones = async () => {
      if (selectedMateria) {
        const atencionesFromApi = await getAte(selectedMateria);
        setAtenciones(atencionesFromApi);
      } else {
        setAtenciones([]);
      }
    };

    fetchAtenciones();
  }, [selectedMateria]);

  const handleMateriaChange = (materia, nombreMateria) => {
    setSelectedMateria(materia);
    setSelectedMateriaNombre(nombreMateria);
  };

  const handleAtencionChange = (atencion) => {
    setSelectedAtencion(atencion);
  };

  const ValidateData = (registro) => {
    //const {codtit,vfechahora,vcodalu,valumno,vmotivo}  = registro;
    setErrorUser("");
    let isValid = true;
    if (size(registro.motivo)<5) {
      setErrorUser("Debe especificar motivo");
      isValid = false;
    }
    if (size(registro.id)<6 || size(registro.nombre)<6) {
      setErrorUser("No existe estudiante");
      isValid = false;
    }
    if (size(registro.prof) < 3 || size(registro.Fechayhora)<6) {
      setErrorPassword("No existe materia o profesor");
      isValid = false;
    }
    return isValid;
  };

  graba = async() => {
    const registro = {
      id: id,
      nombre: title,
      prof: selectedMateria,
      Materia: selectedMateriaNombre, // Incluir el nombre de la materia
      Fechayhora: selectedAtencion,
      motivo: motivo,
    };
     console.log("RegCita",registro);
     if (ValidateData(registro)){
        const res1 = saveRegistro(registro);
        console.log("regcita1",res1);
        if (res1 === 'El registro ya existe.') {
          alert(res1);
        } else if (res1 === 'Agregado exitosamente') {
          alert(res1);
          navigation.goBack();
        } else {
          alert(res1);
        }
      
      }
      else
      { alert(errorUser); 
      }

    }
    const saveRegistro = async (registro) => {
      try {
        const resu = await postCita(registro);
        if (resu === 'El registro ya existe.') {
          alert(resu);
        } else if (resu === 'Agregado exitosamente') {
          alert(resu);
          navigation.goBack();
        } else {
          alert(resu);
        }
      } catch (error) {
        alert(resu);
      }
    };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 84}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        {/* Picker de Materia */}
        <View style={styles.matItem}>
          <Picker
            selectedValue={selectedMateria}
            onValueChange={(itemValue, itemIndex) =>
              handleMateriaChange(itemValue, tasks[itemIndex]?.MATERIA)
            }
          >
            {tasks.map((task) => (
              <Picker.Item
                key={task.id || "defaultKey"}
                label={`${task.MATERIA} -- ${task.NOMTIT}`}
                value={task.CODTIT}
              />
            ))}
          </Picker>
        </View>
        {/* Picker de Atención */}
        <View style={styles.FechaItem}>
          <Picker
            selectedValue={selectedAtencion}
            onValueChange={handleAtencionChange}
          >
            {atenciones.map((atencion) => (
              <Picker.Item
                key={atencion.id || "defaultKey"}
                label={`${atencion.DIA} -- ${atencion.FECHA_PROXIMA}`}
                value={atencion.FECHA_PROXIMA}
              />
            ))}
          </Picker>
        </View>
          {/* Elemento MOTIVO */}
        <View style={styles.motivoItem}>
          <TextInput
            value={motivo}
            onChangeText={(text) => setMotivo(text.replace(/\s+/g, ' '))}
            placeholder="Escribe el motivo aquí"
            style={styles.input}
            multiline={true}
            numberOfLines={3}
          />
        </View>
  
        {/* Botón CONCERTAR CITA */}
        <View style={[styles.IngrBtnContainer, { marginBottom: 20 }]}>
          <TouchableOpacity style={styles.IngrBtn} onPress={graba}>
            <Text style={styles.btnText}>CONCERTAR CITA</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: "flex-start",
  },
  motivoItem: {
    backgroundColor: "#c7c7c7",
    borderRadius: 5,
    padding: 6,
    marginBottom: 3, // Reducido para disminuir el espacio
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "white",
    padding: 8,
    fontSize: 18,
    height: 90, // Establece la altura deseada
    textAlignVertical: "top",
    borderRadius: 5,
  },
  IngrBtn: {
    backgroundColor: '#2897f4',
    width: screenWidth * 0.8, // Usar un porcentaje del ancho de la pantalla
    height: 50, // Valor fijo más adecuado para la altura del botón
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  IngrBtnContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  header: {
    marginBottom: 10,
  },
  matItem: {
    backgroundColor: "#989898",
    marginBottom: 4,
    paddingVertical:2,
    padding:4,
  },
  FechaItem: {
    backgroundColor: "#2897f4",
    borderRadius: 5,
    padding: 6,
    marginBottom: 3, // Reducido para disminuir el espacio
  },
  itemText: {
    color: "#ffffff",
    fontSize: 18,
    marginBottom: 0,
  },
  btnText: {
    color: "#ffffff",
    fontSize: 20,
  },
    // ... (otros estilos)
  });
  
  export default DetailItem;


