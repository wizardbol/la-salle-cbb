import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ItemList = ({ title, field1, field2, field3, field4 }) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.fieldsContainer}>
        <Text style={[styles.field, { width: '60%' }]}>{field1}</Text>
        <Text style={[styles.field, { width: '10%' }]}>{field2}</Text>
        <Text style={[styles.field, { width: '10%' }]}>{field3}</Text>
        <Text style={[styles.field, { width: '10%' }]}>{field4}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  fieldsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  field: {
    fontSize: 14,
    marginRight: 10,
  },
});

export default ItemList;
