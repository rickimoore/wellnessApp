import React, { PureComponent } from "react";
import { StyleSheet, View, Text } from "react-native";
import { displayAttributes } from "../../utils";

const RADIUS = 50;


interface RenderProps {
    position: Array,
    points: Number
}

export class Renderer extends PureComponent<RenderProps> {
    render() {
        return (
            <View style={styles.display}>
                {displayAttributes(this.props.attributes)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    display: {
        borderColor: "#CCC",
        borderWidth: 4,
        width: RADIUS * 2,
        height: RADIUS * 2,
        backgroundColor: "pink",
        position: "absolute",
        top: 250 - RADIUS,
        left: 0,
        marginLeft: -125
    }
});

export default (sex, attributes) => {
    return {
        attributes: attributes,
        sex: sex,
        renderer: <Renderer />
    };
};