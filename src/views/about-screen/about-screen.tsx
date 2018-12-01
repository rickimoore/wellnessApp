import * as React from "react"
import {View, SafeAreaView, StyleSheet} from "react-native"
import { NavigationScreenProps } from "react-navigation"
import { Text } from "../shared/text/index"
import { Button } from "../shared/button/index"
import {Screen} from "../shared/screen";
export interface AboutScreenProps extends NavigationScreenProps<{}> {}

export class AboutScreen extends React.Component<AboutScreenProps, {}> {
    goBack = () => this.props.navigation.goBack(null)
    render() {
        return (
            <Screen style={styles.container}>
                <SafeAreaView style={styles.container}>
                    <Text>About screen</Text>
                    <Button onPress={() => this.goBack()} text={"Home"}/>
                </SafeAreaView>
            </Screen>
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
