import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Vibration, Pressable, Keyboard, FlatList } from "react-native";
import ResultImc from "./ResultImc/";
import styles from "./style";


export default function Form(){

const [height,setHeight] = useState()
const [weight, setWeight] = useState(null)
const [messageImc, setMessageImc] = useState("Preencha o peso e a altura")
const [imc, setImc] = useState(null)
const [TextButton, setTextButton] = useState("Calcular")
const [errorMessage, setErrorMessage] = useState(null)
const [imcList, setImcList] = useState([])

function imcCalculator () {
    let heightFormat = height.replace(",",".")
    let totalImc = ( (weight/ (heightFormat * heightFormat)).toFixed(2))
    setImcList ((arr)=> [...arr, {id: new Date().getTime(), imc:totalImc}])
    setImc(totalImc)
}

function verificationImc() {
    if(imc == null) {
        Vibration.vibrate();
    }
    setErrorMessage("Campo obrigatório*")
}

function validationImc() {
    if(weight != null && height != null) {
        imcCalculator()
        setHeight(null)
        setWeight(null)
        setMessageImc("Seu IMC é: ")
        setTextButton("Calcular novamente")
        setErrorMessage(null)
    }
    else {
    verificationImc()
    setImc(null)
    setTextButton("Calcular")
    setMessageImc("Preencha o Peso e Altura")
}
}


    return (
    <View style={styles.form}>

            {imc == null ?
        <Pressable onPress={Keyboard.dismiss} style={styles.formContext}>
                <Text style={styles.formLabel}>Digite a sua Altura: </Text>
                <Text style={styles.errorMessage}> {errorMessage} </Text>
                <TextInput style={styles.input} onChangeText={setHeight} value={height} placeholder="Ex. 1.75" keyboardType="numeric"> </TextInput>

                <Text style={styles.formLabel} > Digite o seu Peso em Kg: </Text>
                <Text style={styles.errorMessage} > {errorMessage} </Text>

                <TextInput style={styles.input} onChangeText={setWeight} value={weight} placeholder="Ex. 100Kg" keyboardType="numeric"> </TextInput>
        <TouchableOpacity 
        style={styles.buttonCalculator}
        onPress={()=>{validationImc()
        }} > 
        <Text style={styles.textButtonCalculator} >  {TextButton} </Text>
        </TouchableOpacity>

        </Pressable>
        : 
           <View style={styles.exibirResultadoImc}>
               <ResultImc messageResultImc={messageImc} resultImc={imc} />
               <TouchableOpacity 
        style={styles.buttonCalculator}
        onPress={()=>{validationImc()}} 
        > 
        <Text style={styles.textButtonCalculator} >  {TextButton} </Text>
        </TouchableOpacity>
           </View>
        }
        <FlatList 
        showsVerticalScrollIndicator={false}
        style={styles.listImcs}
        data={imcList.reverse()}
        renderItem={({item}) => {
        return(
            <Text style={styles.resultImc}>
            <Text style={styles.textResultItemList} >Resultado IMC = {item.imc}</Text>
            </Text>
            )
        }}
        keyExtractor={(item)=> {
             item.id
            }}
        >
        </FlatList>
    </View>

    );
}