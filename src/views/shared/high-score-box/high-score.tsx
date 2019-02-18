import * as React from "react"
import {View, Text, StyleSheet} from "react-native"
import {color} from "../../../theme";

export interface HighScoreProps {
    score: Number
}

export function HighScore(props: HighScoreProps) {
    return (
        <View style={styles.container}>
            <View style={styles.whiteBackDrop}/>
            <View>
                <Text style={styles.score}>HighScore: {props.score}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderWidth: 2,
        borderColor: "white",
        width: 200,
    },
    whiteBackDrop: {
        position: "absolute",
        backgroundColor: "white",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        opacity: .3
    },
    textBackDrop: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2,
    },
    score: {
        color: color.palette.white,
        fontSize: 18,
        textAlign: "center"
    }
})
