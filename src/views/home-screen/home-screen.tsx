import * as React from "react"
import { View, StatusBar, StyleSheet } from "react-native"
import { NavigationScreenProps } from "react-navigation"
import { Text } from "../shared/text/index"
import { Button } from "../shared/button/index"
import { Wallpaper } from "../shared/wallpaper/index"
import {UiStateStore} from "../../stores/ui-state-store";
import { InstructionsModal } from "../modals/instructions";
import {GameStateStore} from "../../stores/game-state-store";
import {inject, observer} from "mobx-react/native";

// import { color, spacing } from "../../../theme"

export interface HomeScreenProps extends NavigationScreenProps<{}> {
    uiStateStore: UiStateStore,
    gameStateStore: GameStateStore
}

@inject("uiStateStore", "gameStateStore")
@observer
export class HomeScreen extends React.Component<HomeScreenProps, {}> {
  startGame = () => {
      const store = this.props.gameStateStore
      this.props.navigation.navigate("gameScreen")
      setTimeout(() => store.endGame(), 3000)
  }
  viewScreen = (screen) => this.props.navigation.navigate(screen)
  viewInstructions = () => this.props.uiStateStore.showInstructions()


  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <InstructionsModal/>
        <Wallpaper />
        <Text>Tinder Strike</Text>
          <View style={styles.actionBox}>
              <Button style={styles.actionButton} onPress={() => this.startGame()} text={"Play Game"}/>
              <Button style={styles.actionButton} onPress={() => this.viewInstructions()} text={"Instructions"}/>
              <Button style={styles.actionButton} onPress={() => this.viewScreen("aboutScreen")} text={"About"}/>
          </View>
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
    },
    actionBox: {
        flexDirection: "column",
    },
    actionButton: {
        marginTop: 25,
    }
})


