import * as React from "react"
import { View, StatusBar, StyleSheet } from "react-native"
import { NavigationScreenProps } from "react-navigation"
import { Text } from "../../shared/text"
import { Button } from "../../shared/button"
import { Wallpaper } from "../../shared/wallpaper"
// import { color, spacing } from "../../../theme"

export interface FirstExampleScreenProps extends NavigationScreenProps<{}> {}

export class FirstExampleScreen extends React.Component<FirstExampleScreenProps, {}> {
  nextScreen = () => this.props.navigation.navigate("secondExample")

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />      
        <Wallpaper />
        <Text>Hello World</Text>
        <Text>Nuria and Ricki</Text>
        <Button onPress={() => this.nextScreen()} text={"Play Game"}/>
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


