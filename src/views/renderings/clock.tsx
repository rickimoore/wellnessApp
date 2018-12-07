import React, { PureComponent } from "react";
import { StyleSheet, View, Text } from "react-native";

class Renderer extends PureComponent {
    msToSeconds = (ms) => parseInt(((ms % 60000) / 1000).toFixed(0));
    displayTimer = (time = 0, limit) => {
        const remainder = this.msToSeconds(limit - time);
        return remainder > 0 ? (remainder < 10 ? '0': '') + remainder : '00'
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.display}>{this.displayTimer(this.props.timeDisplay, this.props.limit)}</Text>
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

export default (time, timeDisplay,limit) => {
    return {
        limit: limit,
        time: time,
        timeDisplay: timeDisplay,
        renderer: <Renderer />
    };
};