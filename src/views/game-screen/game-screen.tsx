import * as React from "react"
import {View, SafeAreaView, StyleSheet} from "react-native"
import { NavigationScreenProps } from "react-navigation"
import { Text } from "../shared/text/index"
import { Button } from "../shared/button/index"
import { Wallpaper } from "../shared/wallpaper/index"
import { GameOverModal } from "../modals/game-over";
import {UiStateStore} from "../../stores/ui-state-store";
import {inject, observer} from "mobx-react/native";

export interface GameScreenProps extends NavigationScreenProps<{}> {
    uiStateStore: UiStateStore
}

@inject("uiStateStore")
@observer
export class GameScreen extends React.Component<GameScreenProps, {}> {
  goBack = () => this.props.navigation.goBack(null)
  render() {
    return (
      <View style={styles.container}>
        <Wallpaper />
          <GameOverModal />
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
