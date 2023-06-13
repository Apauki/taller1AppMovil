import { View, Text, Button, Alert, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'

import { getAuth, signOut } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../Components/Config';

import Duck from '../Components/Duck';

export default function Juego({ navigation }) {

  const [tiempo, settiempo] = useState(10)
  const [reiniciar, setreiniciar] = useState(false)
  const [mostrarAlert, setmostrarAlert] = useState(false)
  
    useEffect(() => {
      let temporizador;
  
      if (tiempo === 0) {
        setmostrarAlert(true);
      }
  
      if (reiniciar) {
        settiempo(10);
        setreiniciar(false);
      } else if (tiempo > 0 && !mostrarAlert) {
        temporizador = setInterval(() => {
          settiempo((tiempoAnterior) => {
            if (tiempoAnterior === 1) {
              clearInterval(temporizador);
            }
            return tiempoAnterior - 1;
          });
        }, 1000);
      }
  
      return () => {
        clearInterval(temporizador);
      };
    }, [tiempo, reiniciar, mostrarAlert]);

    const cerrarAlert = () => {
      setmostrarAlert(false);
      setreiniciar(true);
    };

  function salir(){

    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app);
    signOut(auth).then((userCredential) => {
      navigation.navigate("Login")
    }).catch((error) => {
      Alert.alert("Error")
    });

  }  

  return (
    <View>
      <Text>Juego</Text>
      <Button
        title='LogOut'
        onPress={()=>salir()}
      />

      <Duck/>

      <Text>{tiempo}</Text>
      <Modal visible={mostrarAlert} onRequestClose={() => {}}>
        <View>
          <Text>GAME OVER</Text>
          <Text>Su puntuación es: </Text>
          <Button title="Cerrar" onPress={cerrarAlert} />
        </View>
      </Modal>
    </View>
  )
}