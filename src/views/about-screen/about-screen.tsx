import * as React from "react"
import {View, SafeAreaView, StyleSheet} from "react-native"
import { NavigationScreenProps } from "react-navigation"
import { Text } from "../shared/text/index"
import { Button } from "../shared/button/index"
import { Wallpaper } from "../shared/wallpaper/index"

export interface AboutScreenProps extends NavigationScreenProps<{}> {}

export class AboutScreen extends React.Component<AboutScreenProps, {}> {
    goBack = () => this.props.navigation.goBack(null)
    render() {
        return (
            <View style={styles.container}>
                <Wallpaper />
                <SafeAreaView style={styles.container}>
                    <Text>About screen</Text>
                    <Button onPress={() => this.goBack()} text={"Home"}/>
                </SafeAreaView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    }
})
