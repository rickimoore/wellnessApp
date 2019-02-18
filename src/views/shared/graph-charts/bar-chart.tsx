import * as React from "react"
import {Animated, StyleSheet, View} from "react-native";
import {color} from "../../../theme";
import {agendaStore} from "../../../stores/agendaStore";
import {inject, observer} from "mobx-react";


export interface BarChartProps  {
    state: Boolean,
    data?: object,
    agendaStore: agendaStore
}

const MAX_HEIGHT = 220;

@inject("agendaStore")
@observer
export class BarChart extends React.Component<BarChartProps, {}> {
    _animatedMargin = new Animated.Value(1);
    _animatedEmpty = new Animated.Value(1);

     cycleAnimation = () => {
        Animated.sequence([
            Animated.timing(this._animatedEmpty, {
                toValue: MAX_HEIGHT / 2,
                duration: 500,
                delay: 1000
            }),
            Animated.timing(this._animatedMargin, {
                toValue: MAX_HEIGHT,
                duration: 500,
                delay: 0
            }),
        ]).start(() => {
            this.cycleAnimation();
        });
    };
    componentDidUpdate(prevProps, prevState) {
        if(this.props.state) {
            this.cycleAnimation()
        }
    }

    render () {
        return (
            <View style={styles.container}>
                <View style={styles.chartSection}>
                    <Animated.View style={[styles.bar, styles.inactiveBar, {height: this._animatedEmpty}]}/>
                    <Animated.View style={[styles.bar, styles.inactiveBar, {height: this._animatedEmpty}]}/>
                    <Animated.View style={[styles.bar, styles.cardioBar,{ height: this._animatedMargin }]}/>
                    <Animated.View style={[styles.bar, styles.cardioBar, { height: this._animatedMargin  }]}/>
                </View>
                <View style={styles.chartSection}>
                    <Animated.View style={[styles.bar, styles.inactiveBar, {height: this._animatedEmpty}]}/>
                    <Animated.View style={[styles.bar, styles.inactiveBar, {height: this._animatedEmpty}]}/>
                    <Animated.View style={[styles.bar, styles.strengthBar,{ height: this._animatedMargin }]}/>
                    <Animated.View style={[styles.bar, styles.strengthBar,{ height: this._animatedMargin }]}/>
                </View>
                <View style={styles.chartSection}>
                    <Animated.View style={[styles.bar, styles.inactiveBar, {height: this._animatedEmpty}]}/>
                    <Animated.View style={[styles.bar, styles.inactiveBar, {height: this._animatedEmpty}]}/>
                    <Animated.View style={[styles.bar, styles.sportBar,{ height: this._animatedMargin }]}/>
                    <Animated.View style={[styles.bar, styles.sportBar,{ height: this._animatedMargin }]}/>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
  },
  chartSection: {
      height: "100%",
      width: "33.3%",
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "space-around",
  },
  bar: {
      height: "100%",
      width: 15,
      backgroundColor: color.palette.lightPurple,
      borderRadius: 10,
  },
  strengthBar: {
    backgroundColor: color.fitnessActivity.strength
  },
  cardioBar: {
    backgroundColor: color.fitnessActivity.cardio
  },
  sportBar: {
    backgroundColor: color.fitnessActivity.sport
  },
  inactiveBar: {
      backgroundColor: color.palette.lightGrey,
      height: "50%"
  }
});