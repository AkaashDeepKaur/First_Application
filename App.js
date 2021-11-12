import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Splash from './Splesh/Splesh'
import Home from './Home/Home'

export default function App() {
  let [loading, setLoading] = useState(false)
  setTimeout(()=> {
  setLoading(true)
  },2000)
  if (!loading) { 
    return<Splash />
  }
  return  <Home />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#76afa2',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
