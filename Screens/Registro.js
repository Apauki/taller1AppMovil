import { View, Text, TextInput, Alert, Button, FlatList } from 'react-native'
import React, { useState } from 'react'

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../Components/Config';
import { db } from '../Components/Config';
import { getDatabase, onValue, ref, remove, set } from "firebase/database";

export default function Registro({ navigation }) {

  const [correo, setcorreo] = useState("")
  const [password, setpassword] = useState("")
  const [nick, setnick] = useState("")
  const [edad, setedad] = useState("")
  const [datos, setdatos] = useState("")

  function registrar(){

    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, correo, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        guardar(correo, nick, edad)

        Alert.alert("Usuario registrado con éxito")
        navigation.navigate("Juego")

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert("Error al registrarse")
        // ..
      });

  }

  function guardar(correoE, nickE, edadE){
    set(ref(db, 'jugadores/' + nick),{
      email: correoE,
      nick: nickE,
      age:edadE
    })

  }

  function leer(){
    const starCountRef = ref(db, 'jugadores/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();



      const dataArray = Object.entries(data).map(([key, value])=>({
        key, ...value
      }));

      setdatos(dataArray)

    })
  }

  function eliminar(id){
    remove(ref(db, 'jugadores/' + id))
  }

  return (
    <View>
      <Text>Registro</Text>
      <TextInput
        placeholder='Ingrese su correo electrónico'
        keyboardType='email-address'
        onChangeText={(text)=> setcorreo(text)}
      />
      <TextInput
        placeholder='Cree su nick'
        onChangeText={(text)=> setnick(text)}
      />
      <TextInput
        placeholder='Ingrese su edad'
        onChangeText={(text)=> setedad(text)}
        keyboardType='numeric'
      />
      <TextInput
        placeholder='Ingrese una contraseña'
        onChangeText={(text)=> setpassword(text)}
      />
      <Button
        title='Registrar'
        onPress={()=>registrar()}
      />
      <Button
        title='Leer'
        onPress={()=> leer()}
      />

      <FlatList
        data={datos}
        renderItem={({item})=>
        <View>
          <Text>{item.key}</Text>

          <Button title='Eliminar'
            onPress={()=>eliminar(item.key)}
          />
        </View>
      }
      />

    </View>
  )
}