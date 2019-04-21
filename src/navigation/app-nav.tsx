import {createTabNavigator, NavigationActions} from "react-navigation"
import { color } from "../theme/color"
import { Icon } from "../views/shared/icon"
import { ProfileScreen } from "../views/app-screens/profileScreen"
import { PostScreen } from "../views/modals/new-post";
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
        postScreen: {
            screen: PostScreen,
            navigationOptions: {
                ...options,
                tabBarLabel: "Create Post",
                tabBarIcon: ({ focused, horizontal }) => {
                    return createTabIcon(focused, horizontal, "postIcon", "postActive")
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

// const defaultGetStateForAction = AppNavigator.router.getStateForAction;
//
// AppNavigator.router.getStateForAction = (action, state) => {
//     if ((action.type === NavigationActions.NAVIGATE) && (action.routeName === "postScreen")) {
//         console.log()
//
//         return null;
//     }
//
//     return defaultGetStateForAction(action, state);
// };
