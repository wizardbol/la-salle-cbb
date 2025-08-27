import React, { useState, useEffect } from 'react';
import { Linking, Alert, View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { getNomi } from "../api";

const Seduca = ({ route }) => {
    const { id } = route.params;
    
    const [item, setItem] = useState(null);
    const [boletinDisponible, setBoletinDisponible] = useState(false);
    const [libretaDisponible, setLibretaDisponible] = useState(false);
    const [estadisticaDisponible, setEstadisticaDisponible] = useState(false);

    useEffect(() => {
        const fetchNomina = async () => {
            try {
                const response = await getNomi(id);
                setItem(response);
                // Verifica la disponibilidad de ambos documentos después de obtener la respuesta
                verificarDisponibilidadBoletin(response);
                verificarDisponibilidadLibreta(response);
                verificarDisponibilidadEstadistica(response);
            } catch (error) {
                console.log(error);
            }
        };

        fetchNomina();
    }, [id]); // La dependencia `id` asegura que useEffect se ejecute cuando `id` cambie

    const verificarDisponibilidadBoletin = async (itemResponse) => {
        // Ajusta según la estructura real de tu respuesta
        const nivel = itemResponse[0].nivel;
        const url = `https://www.lasallecba.org/pru/bole/${nivel}/${id}.pdf`;

        try {
            const response = await fetch(url, { method: 'HEAD' });
            setBoletinDisponible(response.ok);
        } catch (error) {
            console.error("Error al verificar la disponibilidad del boletín:", error);
            setBoletinDisponible(false); // Considerar no disponible si hay error
        }
    };

    const verificarDisponibilidadLibreta = async (itemResponse) => {
        // Ajusta según la estructura real de tu respuesta
        const nivel = itemResponse[0].nivel;
        const registrou = itemResponse[0].registrou;
        const url = `https://www.lasallecba.org/pru/${nivel}/libreta_${registrou}_2024.pdf`;

        try {
            const response = await fetch(url, { method: 'HEAD' });
            setLibretaDisponible(response.ok);
        } catch (error) {
            console.error("Error al verificar la disponibilidad de la libreta:", error);
            setLibretaDisponible(false); // Considerar no disponible si hay error
        }
    };

    const verificarDisponibilidadEstadistica = async (itemResponse) => {
        // Ajusta según la estructura real de tu respuesta
        const nivel = itemResponse[0].nivel;
        const url = `https://www.lasallecba.org/pru/estadistica/${nivel}/${id}.pdf`;

        try {
            const response = await fetch(url, { method: 'HEAD' });
            setEstadisticaDisponible(response.ok);
        } catch (error) {
            console.error("Error al verificar la disponibilidad de la estadística:", error);
            setEstadisticaDisponible(false); // Considerar no disponible si hay error
        }
    };

    const openURL = async (url, tipo) => {
        // Verificar la disponibilidad antes de intentar abrir el enlace
        if ((tipo === 'boletin' && !boletinDisponible) || (tipo === 'libreta' && !libretaDisponible) || (tipo === 'estadistica' && !estadisticaDisponible)) {
            Alert.alert("En proceso", "El archivo solicitado está en proceso y no puede ser visualizado en este momento.");
            return;
        }
        try {
            const canOpen = await Linking.canOpenURL(url);
            if (canOpen) {
                await Linking.openURL(url);
            } else {
                throw new Error('Link cannot be opened');
            }
        } catch (error) {
            Alert.alert("Error", "Hubo un error al intentar abrir el enlace.");
        }
    };

    const renderMenuButton = (imagePath, buttonText, onPress) => (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Image source={imagePath} style={styles.icon} />
            <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
    );

    const boletinIcon = require('../assets/opciones/boletinLS.png');
    const libretaIcon = require('../assets/opciones/boletinSEDUCA.png');
    const estadisticaIcon = require('../assets/opciones/estadisticas.png');

    if (!item || !item[0]) {
        return <View style={styles.container}><Text>Loading...</Text></View>;
    }

    return (
        <View style={styles.container}>
            {renderMenuButton(
                boletinIcon,
                boletinDisponible ? 'Boletín' : 'Boletín en proceso',
                () => openURL(`https://www.lasallecba.org/pru/bole/${item[0].nivel}/${id}.pdf`, 'boletin')
            )}
            <View style={styles.buttonSpacer} />
            {renderMenuButton(
                libretaIcon,
                libretaDisponible ? 'Libreta' : 'Libreta en proceso',
                () => openURL(`https://www.lasallecba.org/pru/${item[0].nivel}/libreta_${item[0].registrou}_2024.pdf`, 'libreta')
            )}
            <View style={styles.buttonSpacer} />
            {renderMenuButton(
                estadisticaIcon,
                estadisticaDisponible ? 'Estadística' : 'Estadística en proceso',
                () => openURL(`https://www.lasallecba.org/pru/estadistica/${item[0].nivel}/${id}.pdf`, 'estadistica')
            )}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 30,
        marginLeft: 10,
    },
    icon: {
        width: 80,
        height: 80,
    },
    buttonSpacer: {
        height: 10,
    }
});

export default Seduca;
