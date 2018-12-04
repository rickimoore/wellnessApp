import React, { PureComponent } from "react";
import { StyleSheet, View, Text } from "react-native";

const RADIUS = 20;


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
                <Text>{this.props.points}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    finger: {
        borderColor: "#CCC",
        borderWidth: 4,
        borderRadius: RADIUS * 2,
        width: RADIUS * 2,
        height: RADIUS * 2,
        backgroundColor: "pink",
        position: "absolute"
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