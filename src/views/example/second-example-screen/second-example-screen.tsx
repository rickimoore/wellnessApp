import * as React from "react"
import {View, Image, ViewStyle, TextStyle, ImageStyle, SafeAreaView, StyleSheet} from "react-native"
import { NavigationScreenProps } from "react-navigation"
import { Screen } from "../../shared/screen"
import { Text } from "../../shared/text"
import { Button } from "../../shared/button"
import { Wallpaper } from "../../shared/wallpaper"
import { Header } from "../../shared/header"
import { color, spacing } from "../../../theme"
import { logoIgnite, heart } from "./"
import { BulletItem } from "../bullet-item"
import { Api } from "../../../services/api"
import { save } from "../../../lib/storage"

export interface SecondExampleScreenProps extends NavigationScreenProps<{}> {}

export class SecondExampleScreen extends React.Component<SecondExampleScreenProps, {}> {
  goBack = () => this.props.navigation.goBack(null)

  demoReactotron = async () => {
    console.tron.log("Your Friendly tron log message")
    console.tron.logImportant("I am important")
    console.tron.display({
      name: "DISPLAY",
      value: {
        numbers: 1,
        strings: "strings",
        booleans: true,
        arrays: [1, 2, 3],
        objects: {
          deeper: {
            deeper: {
              yay: "👾",
            },
          },
        },
        functionNames: function hello() {},
      },
      preview: "More control with display()",
      important: true,
      image: {
        uri:
          "https://avatars2.githubusercontent.com/u/3902527?s=200&u=a0d16b13ed719f35d95ca0f4440f5d07c32c349a&v=4",
      },
    })
    // make an API call for the demo
    // Don't do API like this, use store's API
    const demo = new Api()
    demo.setup()
    demo.getUser("1")
    // Let's do some async storage stuff
    await save("Cool Name", "Boaty McBoatface")
  }

  render() {
    return (
      <View style={styles.container}>
        <Wallpaper />
        <SafeAreaView style={styles.container}>
          <Text>Gameplay Level 1</Text>
          <Button onPress={() => this.goBack()} text={"Quit"}/>
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
