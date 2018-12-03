import React, { PureComponent } from "react";
import { StyleSheet, View, Text } from "react-native";

export class Renderer extends PureComponent {
    msToSeconds = (ms) => parseInt(((ms % 60000) / 1000).toFixed(0));
    displayTimer = (time, limit) => {
        const remainder = this.msToSeconds(limit - time);
        return remainder > 0 ? (remainder < 10 ? '0': '') + remainder : '00'
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.display}>{this.displayTimer(this.props.display, this.props.limit)}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 100,
        left: 0,
        width: 100,
        marginLeft: -50,
        right: 0,
        backgroundColor: "red"
    },
    display: {
        textAlign: "center",
        color: "white",
        fontSize: 38,
    }
});

export default (time, limit) => {
    return {
        limit: limit,
        display: time,
        renderer: <Renderer />
    };
};