import { createStackNavigator } from "react-navigation"
import { AppNavigator } from "./app-nav";
import { OnboardingScreen } from "../views/onboarding/onboardingScreen";

export const RootNavigator = createStackNavigator(
  {
      onBoarding: { screen: OnboardingScreen},
      mainStack: { screen:  AppNavigator},
  },
  {
    headerMode: "none",
    initialRouteName: "onBoarding",
    navigationOptions: { gesturesEnabled: false },
  },
)
