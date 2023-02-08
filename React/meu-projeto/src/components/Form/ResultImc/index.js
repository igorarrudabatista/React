import React from "react";
import { View, Text, TouchableOpacity, Share } from "react-native";

import styles from "./style";

export default function ResultImc(props) {

    const onShare = async() => {
        const result = await Share.share({
            message: " O Meu IMC é: " +props.resultImc,
        })
    }
    return (
        <View style={styles.ContextImc}>
            <View style={styles.boxSharedbutton}>
            <Text style={styles.information}> {props.messageResultImc} </Text>
            <Text style={styles.number}> {props.resultImc} </Text>
            
                <TouchableOpacity onPress={onShare} style={styles.shared}>
                    <Text style={styles.sharedText}>Compartilhar meu IMC</Text>
                </TouchableOpacity>
            
            
            </View>

        </View>
    );
}
