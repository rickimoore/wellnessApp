import {createTabNavigator} from "react-navigation"
import { color } from "../theme/color"
import { Icon } from "../views/shared/icon"
import { ProfileScreen } from "../views/app-screens/profileScreen"
import { FeedNavigator } from "./feed-nav";

const options = {
    headerMode: "none",
    navigationOptions: { gesturesEnabled: false },
    cardStyle: { shadowColor: "transparent" },
}

const createTabIcon = (focused, horizontal, icon, altIcon = "") => {
    return Icon({
        icon: focused ? altIcon : icon,
        style: {
            marginTop: horizontal ? 0 : 10,
            marginBottom: horizontal ? 0 : 5,
            marginRight: horizontal ? 10 : 0,
        },
    })
}

export const AppNavigator = createTabNavigator(
    {
        newsFeed: {
            screen: FeedNavigator,
            navigationOptions: {
                ...options,
                tabBarLabel: "News Feed",
                tabBarIcon: ({ focused, horizontal }) => {
                    return createTabIcon(focused, horizontal, "training", "trainingActive")
                },
            },
        },
        homeScreen: {
            screen: ProfileScreen,
            navigationOptions: {
                ...options,
                tabBarLabel: "Profile",
                tabBarIcon: ({ focused, horizontal }) => {
                    return createTabIcon(focused, horizontal, "profile", "profileActive")
                },
            },
        },
    },
    {
        animationEnabled: true,
        tabBarOptions: {
            style: { height: 49, borderTopColor: color.transparent, backgroundColor: color.palette.white ,alignItems: "center" },
            labelStyle: { fontSize: 10, color: color.palette.darkGrey },
            inactiveTintColor: color.palette.offWhite,
            activeTintColor: color.primaryDarker,
        },
    },
)
