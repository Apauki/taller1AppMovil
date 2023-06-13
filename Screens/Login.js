import { View, Text, TextInput, Alert, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../Components/Config';

export default function Login({ navigation }) {

    const [correo, setcorreo] = useState('')
    const [password, setpassword] = useState('')

    function acceder(){
        const app = initializeApp(firebaseConfig)
        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, correo, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigation.navigate('Juego')
            clean()
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            Alert.alert("Error")
          });
    }

    function clean(){
      setcorreo("")
      setpassword("")
    }

  return (
    <View style={{flex: 1}}>
        <ImageBackground source={require("../assets/images/Stage02.png")} style={{flex: 1}}>
          <TextInput 
              style={styles.input}
              placeholder='Ingrese su E-mail'
              keyboardType='email-address'
              onChangeText={(text)=> setcorreo(text)}
              value={correo}
          />

          <TextInput
              style={styles.input}
              placeholder='Ingrese contraseña'
              onChangeText={(text)=> setpassword(text)}
          />

          <View style={styles.buttonContainer}>

            <TouchableOpacity style={styles.btn} onPress={()=>acceder()}>
              <Text style={styles.inputText}>Ingresar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate("Registro")}>
              <Text style={styles.inputText}>Nuevo usuario</Text>
            </TouchableOpacity>
            
          </View>
        </ImageBackground>

    </View>
  )
}

const styles = StyleSheet.create({
  img:{
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover'
  },
  btn:{
    backgroundColor: '#fff',
    width: 150,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonContainer:{
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingBottom: 250,
  },
  input:{
    borderColor: "black",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  inputText:{
    textAlign: 'center'
  }
})