import * as React from "react"
import {StyleSheet, Dimensions} from "react-native"
import { NavigationScreenProps } from "react-navigation"
import { Button } from "../shared/button/index"
import { GameOverModal } from "../modals/game-over";
import {UiStateStore} from "../../stores/ui-state-store";
import {GameStateStore} from "../../stores/game-state-store";
import {inject, observer} from "mobx-react/native";
import { GameEngine } from "react-native-game-engine"
import Systems from "../../systems";
import {color} from "../../theme";
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
        case "change-level":
            gameStore.increaseLevel()
    }
  };
  getCenterLine = () => {
      const canvas  = Dimensions.get("screen");
      return canvas.width / 2;
  };
  getHeight = () => {
      const canvas = Dimensions.get("screen");
      return canvas.height
  }
  render() {
      const gameStore = this.props.gameStateStore
      return (
          <GameEngine
              style={styles.container}
              systems={Systems}
              running={gameStore.isGameRunning}
              onEvent={this.handleEvent}
              entities={{
                  game: {
                      level: gameStore.level
                  },
                  clock: Clock(0, 0),
                  canvas: {center: this.getCenterLine(), height: this.getHeight()}
              }}>
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
