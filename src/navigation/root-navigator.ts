import { createStackNavigator } from "react-navigation"
import { GameNavigator } from "./navigator"
import {HomeScreen} from "../views/home-screen";
import {AboutScreen} from "../views/about-screen/about-screen";

export const RootNavigator = createStackNavigator(
  {
    homeScreen: { screen: HomeScreen},
    aboutScreen: { screen: AboutScreen},
    gameStack: { screen: GameNavigator }
  },
  {
    headerMode: "none",
    navigationOptions: { gesturesEnabled: false },
  },
)
