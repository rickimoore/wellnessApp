import { createStackNavigator } from "react-navigation"
import { GameScreen } from "../views/game-screen"

export const GameNavigator = createStackNavigator({
  gameScreen: { screen: GameScreen },
},
{
  headerMode: "none",
})
