import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Check from '../images/Check';
import Basurero from '../images/Basurero';

const ItemComponent = ({ item, onSelect, onDelete, isHighlighted, token }) => {
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => onSelect(item, token)} style={styles.touchable}>
        <Check />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelect(item, token)} style={styles.textContainer}>
        <Text style={[styles.itemText, isHighlighted && styles.highlightedText]}>
          {item.nombre}
        </Text>
        <Text style={styles.itemSubText}>{item.nivell}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.deleteButton}>
        <Basurero />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 5,
  },
  touchable: {
    // Estilos para el botón táctil
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  itemText: {
    fontSize: 15,
  },
  itemSubText: {
    fontSize: 13,
    color: '#666',
    paddingTop: 5,
  },
  highlightedText: {
    fontWeight: 'bold',
    color: 'red',
  },
  deleteButton: {
    // Estilos para el botón de eliminar
  },
});

export default ItemComponent;
