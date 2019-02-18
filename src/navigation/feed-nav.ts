import {createStackNavigator} from "react-navigation";
import { FeedScreen } from "../views/app-screens/feedscreen";
import { PostScreen } from "../views/app-screens/postscreen";

export const FeedNavigator = createStackNavigator(
    {
        FeedStack: {screen: FeedScreen},
        PostStack: {screen: PostScreen}
    },
    {
        initialRouteName: "FeedStack",
        headerMode: "none",
    }
);