import {createStackNavigator} from "react-navigation";
import {ProfileScreen} from "../views/app-screens/profilescreen";
import {Settingsscreen} from "../views/app-screens/settingsscreen";

export const ProfileNavigator = createStackNavigator(
    {
        MainStack: {screen: ProfileScreen},
        SettingsStack: {screen: Settingsscreen}
    },
    {
        initialRouteName: "MainStack",
        headerMode: "none",
    }
);