import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

export default function Duck() {

    const [posicion, setposicion] = useState({ x:0, y:0 })

    function moverDuck() {
        const MAX_X = 350;
        const MAX_Y = 700;

        const randomX = Math.floor( Math.random() * MAX_X)
        const randomY = Math.floor( Math.random() * MAX_Y)

        setposicion( {x:randomX, y:randomY} )
    }

  return (
    <View style={{top:posicion.y, left:posicion.x, position:'absolute'}}>
        <TouchableOpacity onPress={ ()=> moverDuck() } >
            <Image source={require("../assets/images/duck.png")} style={styles.img}/>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    img:{
        width:80,
        height:60
    }
})