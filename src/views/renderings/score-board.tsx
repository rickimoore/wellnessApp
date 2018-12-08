import React, { PureComponent } from "react";
import { StyleSheet, View, Text } from "react-native";

 class Renderer extends PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.display}>{this.props.score}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 100,
        left: 100,
        width: 100,
        backgroundColor: "blue"
    },
    display: {
        textAlign: "center",
        color: "white",
        fontSize: 38,
    }
});

export default (level, points, volley) => {
    return {
        level: level,
        volley: volley,
        score: points,
        renderer: <Renderer />
    };
};