import React from "react";
import { StyleSheet, TouchableOpacity , View , Text  } from "react-native";

export default function FlatButton ({ text , onPress, backgroundColor ,color}){
    return(
        <TouchableOpacity onPress={onPress} >
            <View style ={[styles.button, { backgroundColor }]}>
                <Text style={[styles.buttonText , { color }]}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        borderRadius :20,
        //paddingHorizontal:10,
        paddingVertical:10,
    },
    buttonText:{
        fontWeight:'bold',
        textAlign:'center',
        fontSize:20,
    }
})
 