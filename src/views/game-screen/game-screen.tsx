import * as React from "react"
import {StyleSheet} from "react-native"
import { NavigationScreenProps } from "react-navigation"
import { Button } from "../shared/button/index"
import { GameOverModal } from "../modals/game-over";
import {UiStateStore} from "../../stores/ui-state-store";
import {GameStateStore} from "../../stores/game-state-store";
import {inject, observer} from "mobx-react/native";
import { GameEngine } from "react-native-game-engine"
import Systems from "../../systems";
import {color} from "../../theme";
import Match from "../renderings/match"
import Clock from "../renderings/clock"

export interface GameScreenProps extends NavigationScreenProps<{}> {
    uiStateStore: UiStateStore
    gameStateStore: GameStateStore
}

@inject("uiStateStore", "gameStateStore")
@observer
export class GameScreen extends React.Component<GameScreenProps, {}> {
  handleEvent = (ev) => {
    const gameStore = this.props.gameStateStore
    switch (ev.type) {
      case "game-over":
          gameStore.endGame()
          break;
    }
  };
  render() {
      const gameStore = this.props.gameStateStore
      return (
          <GameEngine
              style={styles.container}
              systems={Systems}
              running={gameStore.isGameRunning}
              onEvent={this.handleEvent}
              entities={{match: Match("male", "1", [40,  200], []), clock: Clock(0, 0)}}>
              <GameOverModal navCallBack={()=>this.props.navigation.navigate("homeScreen")}/>
              <Button onPress={() => gameStore.endGame()} text={"Quit"}/>
          </GameEngine>
      )
  }
}

const styles = StyleSheet.create({
    background: {backgroundColor: color.background},
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: color.background
    }
})
