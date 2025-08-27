const API = 'https://www.lasallecba.org/backend/'
const APIA = 'https://www.lasallecba.org/backend/acc/'
const APIAV = 'https://www.lasallecba.org/backend/aviso/'
const APIG = 'https://www.lasallecba.org/backend/pags/'
const APIN = 'https://www.lasallecba.org/backend/nota/'
const APIC = 'https://www.lasallecba.org/backend/Cond/'
const APIL = 'https://www.lasallecba.org/backend/lecc/'
const APIE = 'https://www.lasallecba.org/backend/leccExa/'
const APIM = 'https://www.lasallecba.org/backend/mate/'
const APIAT = 'https://www.lasallecba.org/backend/aten/'
const APIU = 'https://www.lasallecba.org/backend/user'
const APIUT = 'https://www.lasallecba.org/backend/uso/'
const APICI = 'https://www.lasallecba.org/backend/cita'
const APICIS = 'https://www.lasallecba.org/backend/citas'
const APIP = 'https://www.lasallecba.org/backend/accpas/'
const APINO = 'https://www.lasallecba.org/backend/nomi/'
const APICONF = 'https://www.lasallecba.org/backend/conf/'
const APINOIN = 'https://www.lasallecba.org/backend/notaindi/'
const APIUAV = 'https://www.lasallecba.org/backend/useaviso/'
//const APIVER = 'https://www.lasallecba.org/backend/veravi'
const URL = 'https://pokeapi.co/api/v2/pokemon/'

export const getPoke = async () => {
  const res = await fetch(URL)
  const datos = await res.json()
  return datos
}
export const getUseAviso = async (cod,vtoken) => {
  const res = await fetch(APIUAV+cod+"/"+vtoken)
  const datos = await res.json()
  return datos
}
export const getusoToken = async (cod,vtoken) => {
  //console.log(APIUT+cod+"/"+vtoken)
  const res = await fetch(APIUT+cod+"/"+vtoken)
  const datos = await res.json()
  return datos
}
export const getAcc = async (cod) => {
    const res = await fetch(APIA+cod)
    const datos = await res.json()
    //alert(datos)  
    return datos
}
export const getConf = async (cod) => {
  const res = await fetch(APICONF+cod)
  const datos = await res.json()
  //alert(datos)  
  return datos
}
export const getpas = async (cod) => {
  const res = await fetch(APIP+cod)
  const datos = await res.json()
  return datos
}
export const getNomi = async (cod) => {
  const res = await fetch(APINO+cod)
  const datos = await res.json()
  return datos
}
export const getNotaIndi = async (cod) => {
  //console.log('nota ind', APINOIN+cod)
  const res = await fetch(APINOIN+cod)
  const datos = await res.json()
  return datos
}


export const postUser = async (usuario) => {
  const {id,nombre,pass,phone,devicetoken} = usuario;
  const queryParams = new URLSearchParams({
    id: id,
    nombre: nombre,
    pass: pass,
    phone: phone,
    devicetoken: devicetoken,
  });
  const response = await fetch(`${APIU}?${queryParams}`, {
    method: 'POST',
    headers: {
      Accept: '*/*',
    },
  });
  if (response.ok) {
    const responseData = await response.json();
    console.log('Response:', responseData);
  } else {
    console.error('Error:', response.status);
  }
  
};

export const postveravi = async (usuario) => {
  const {id,devicetoken,serial} = usuario;
  const queryParams = new URLSearchParams({
    id: id,
    devicetoken: devicetoken,
    serial: serial,
  });
  const response = await fetch(`${APIVER}?${queryParams}`, {
    method: 'POST',
    headers: {
      Accept: '*/*',
    },
  });
  if (response.ok) {
    const responseData = await response.json();
    console.log('Response:', responseData);
  } else {
    console.error('Error:', response.status);
  }
  
};

export const postuseavi = async (usuario) => {
  const {id,devicetoken,codtit,serial} = usuario;
  const queryParams = new URLSearchParams({
    codalu: id,
    devicetoken: devicetoken,
    codtit: codtit,
    serial: serial,
  });
  const response = await fetch(`${APIUAV}?${queryParams}`, {
    method: 'POST',
    headers: {
      Accept: '*/*',
    },
  });
  if (response.ok) {
    const responseData = await response.json();
    console.log('Response:', responseData);
  } else {
    console.error('Error:', response.status);
  }
  
};
export const putCita = async (CODALU, CODSER) => {
  //console.log('putcita:', `${APICI}/${CODALU}/${CODSER}`);
  const response = await fetch(`${APICI}/${CODALU}/${CODSER}`, {
    method: 'PUT', // Uso del método PUT
    headers: {
      Accept: '*/*' // Acepta cualquier tipo de respuesta
    }
  });

  if (response.ok) {
    const responseData = await response.json();
    return responseData;
  } else {
    console.error('Error:', response.status);
    return 'ERROR:';
  }
};

export const postCitas = async (CODALU, CODSER) => {
  //const {Fechayhora,id,motivo,nombre,prof,Materia} = registro;
  const queryParams = new URLSearchParams({
    CODALU: CODALU,
    NOMBRE: "",
    CODTIT: "",
    MATERIA: "",
    HORARIO: "",
    MOTIVO: "",
    CODSER:CODSER,
  });
  //console.log("parametros:",`${APICI}?${queryParams}`);
  const response = await fetch(`${APICIS}?${queryParams}`, {
    method: 'POST',
    headers: {
      Accept: '*/*',
    },
  });
  if (response.ok) {
    const responseData = await response.json();
    //console.log('Response DATA:', responseData);
    return(responseData);
  } else {
    console.error('Error:', response.status);
    return ('ERROR:');
  }
};


export const getCitas = async (cod) => {
  const res = await fetch(APICI+"/"+cod)
  //console.log(APICI+"/"+cod)
  const datos = await res.json()
  //console.log("datosCond"+datos);
  return datos
}

export const postCita = async (registro) => {
  const {Fechayhora,id,motivo,nombre,prof,Materia} = registro;
  const queryParams = new URLSearchParams({
    CODALU: id,
    NOMBRE: nombre,
    CODTIT: prof,
    MATERIA: Materia,
    HORARIO: Fechayhora,
    MOTIVO: motivo,
    CANCELADO: false,
    CODSER:"0"
  });
  //console.log("parametros:",`${APICI}?${queryParams}`);
  const response = await fetch(`${APICI}?${queryParams}`, {
    method: 'POST',
    headers: {
      Accept: '*/*',
    },
  });
  if (response.ok) {
    const responseData = await response.json();
    //console.log('Response DATA:', responseData);
    return(responseData);
  } else {
    console.error('Error:', response.status);
    return ('ERROR:');
  }
};


export const getTasks = async (cod) => {
    //console.log(API+cod)
    const res = await fetch(API+cod)
    const datos = await res.json()
    return datos
}

export const getPags = async (cod) => {
    const res = await fetch(APIG+cod)
    const datos = await res.json()
    return datos
}
export const getConds = async (cod) => {
  const res = await fetch(APIC+cod)
  //console.log(APIC+cod)
  const datos = await res.json()
  //console.log("datosCond"+datos);
  return datos
}
export const getLeccs = async (cod) => {
  //console.log(APIL+cod)
  const res = await fetch(APIL+cod)
  //console.log(APIL+cod)
  const datos = await res.json()
  //console.log("datosLecc"+datos);
  return datos
}
export const getExas = async (cod) => {
  //console.log(APIL+cod)
  const res = await fetch(APIE+cod)
  //console.log(APIL+cod)
  const datos = await res.json()
  //console.log("datosLecc"+datos);
  return datos
}
export const getNotas = async (cod) => {
  const res = await fetch(APIN+cod)
  //console.log(APIN+cod)
  const datos = await res.json()
  //console.log("datosnotas"+datos);
  return datos
}
export const getAviso = async (cod,vnro) => {
  const res = await fetch(APIAV+cod+"/"+vnro)
  const datos = await res.json()
  return datos
}
export const getAte = async (cod) => {
  const res = await fetch(APIAT+cod)
  //console.log(APIAT+cod)
  const datos = await res.json()
  if (datos==null || datos.length==0){
    console.log("datosAtes esta vacio"+datos);
    return ([])
  }
  console.log("datosAtes"+datos);
  return datos
}
export const getMat = async (cod) => {
  const res = await fetch(APIM+cod)
  //console.log(APIM+cod)
  const datos = await res.json()
  //console.log("datosmates"+datos);
  return datos
}

export const getPdf = async (cod) => {
  console.log(API+'pags/'+cod);
    const url = 'https://localhost:3000/public/'+cod;
  try {
    const response = await fetch(url, {
      method: 'GET'
    });
    const pdfData = await response.blob();
    //console.log('pdf'+pdfData);
    // aquí puedes hacer algo con los datos del pdf, como mostrarlo en una pantalla de tu app o guardarlo en el dispositivo.
  } catch (error) {
    console.error(error);
  }
};