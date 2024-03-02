import React, { useEffect, useState } from "react";
import { Alert, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Home from './src/screens/Home';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [todos, setTodos] = useState([]);
  const [ready, setReady] = useState(false);

  const setData = async()=>{
    try {
        let data = await AsyncStorage.getItem("todos");
        // Alert.alert(data);
        if(data!==null){
          data = JSON.parse(data);
          setTodos(data);
        }
        // setTimeout(()=>{
        //    Alert.alert("executed")
        //   setReady(true);
        // },10000)
        setReady(true);
     } catch (error) {
        console.warn(error);
     }
    }

    useEffect(()=>{
       setData();
    },[]);

    if(ready===true){
      SplashScreen.hideAsync();
    }
  return (
    <SafeAreaView>
      <Home todos={todos} setTodos={setTodos}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
