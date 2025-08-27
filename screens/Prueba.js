import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ItemList from './ItemList';

const Prueba = () => {
  const data = [
    { id: '1', title: 'Elemento 1', field1: 'Campo 1', field2: 'Campo 2', field3: 'Campo 3', field4: 'Campo 4' },
    // ... Agrega los datos de los demás elementos aquí ...
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ItemList
            title={item.title}
            field1={item.field1}
            field2={item.field2}
            field3={item.field3}
            field4={item.field4}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Prueba;
