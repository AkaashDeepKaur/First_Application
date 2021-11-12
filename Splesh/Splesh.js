import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Splesh() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Todo List App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#76afa2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text : {
      fontSize: 30,
      color: "white"
  }
});
