import * as React from "react"
import { View, StatusBar, StyleSheet } from "react-native"
import { NavigationScreenProps } from "react-navigation"
import { Text } from "../shared/text/index"
import { Button } from "../shared/button/index"
import { Wallpaper } from "../shared/wallpaper/index"
import {UiStateStore} from "../../stores/ui-state-store";
import { InstructionsModal } from "../modals/instructions";
import {inject, observer} from "mobx-react/native";

// import { color, spacing } from "../../../theme"

export interface HomeScreenProps extends NavigationScreenProps<{}> {
    uiStateStore: UiStateStore
}

@inject("uiStateStore")
@observer
export class HomeScreen extends React.Component<HomeScreenProps, {}> {
  startGame = () => this.props.navigation.navigate("gameScreen")
  viewScreen = (screen) => this.props.navigation.navigate(screen)
  viewInstructions = () => this.props.uiStateStore.showInstructions()

  componentDidMount() {

  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <InstructionsModal/>
        <Wallpaper />
        <Text>Tinder Strike</Text>
        <Button onPress={() => this.startGame()} text={"Play Game"}/>
        <Button onPress={() => this.viewInstructions()} text={"Instructions"}/>
        <Button onPress={() => this.viewScreen("aboutScreen")} text={"About"}/>
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


