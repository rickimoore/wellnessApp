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
import Level from "../../levels/basic"
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
            break;
        case "add-points":
            gameStore.addPoints(ev.amount)
    }
  };
  restart = () => {
      const gameStore = this.props.gameStateStore
      gameStore.startGame(() => this.refs.engine.swap(Level(gameStore.gameLevel, gameStore.score)))
  };
  render() {
      const gameStore = this.props.gameStateStore
      return (
          <GameEngine
              ref={"engine"}
              style={styles.container}
              systems={Systems}
              running={gameStore.isGameRunning}
              onEvent={this.handleEvent}
              entities={Level(gameStore.gameLevel, gameStore.score)}>
              <GameOverModal restart={() => this.restart()} navCallBack={()=>this.props.navigation.navigate("homeScreen")}/>
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
