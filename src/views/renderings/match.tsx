import React, { PureComponent } from "react";
import { StyleSheet, View, Text } from "react-native";
import { displayAttributes } from "../../utils";

const RADIUS = 100;


interface RenderProps {
    position: Array,
    points: Number
}

export class Renderer extends PureComponent<RenderProps> {
    render() {
        const x = this.props.position[0] - RADIUS;
        const y = this.props.position[1] - RADIUS / 2;
        return (
            <View style={[styles.finger, { left: x, top: y }]}>
                <Text>{this.props.status}</Text>
                <View style={styles.attributesContainer}>
                    {displayAttributes(this.props.attributes)}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    finger: {
        borderColor: "#CCC",
        borderWidth: 4,
        width: RADIUS * 2,
        height: RADIUS * 2,
        backgroundColor: "pink",
        position: "absolute"
    },
    attributesContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    }
});

export default (sex, points, position, attributes) => {
    return {
        attributes: attributes,
        position: position,
        points: points,
        sex: sex,
        status: "pending",
        renderer: <Renderer />
    };
};