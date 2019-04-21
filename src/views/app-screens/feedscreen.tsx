import * as React from "react";
import {NavigationScreenProps} from "react-navigation";

import { Screen } from "../shared/screen"
import { TopNav } from "../shared/top-nav";
import { Text } from "../shared/text";
import { ImageCard } from "../shared/image-card";

import { newsFeedStore } from "../../stores/newsFeedStore";
import {color} from "../../theme";
import {Dimensions, StyleSheet, ViewStyle, View, TouchableOpacity, ScrollView} from "react-native";
import {inject, observer} from "mobx-react";
import {test_images} from "../shared/image-card/test-images";
import moment from 'moment';


export interface FeedScreenProps extends NavigationScreenProps<{}> {
    newsFeedStore: newsFeedStore
}

const SCREEN: ViewStyle = {
    flexDirection: "column",
}

const screenWidth = Dimensions.get("screen").width;

const SCROLL_SCREEN: ViewStyle = {
    width: screenWidth,
    zIndex: 99,
    paddingTop: 50,
}

@inject("newsFeedStore")
@observer
export class FeedScreen extends React.Component<FeedScreenProps> {
    navToPost = (post) => {
        this.props.newsFeedStore.setActivePost(post).then(() =>{
            this.props.navigation.navigate("PostStack")
        });
        
    };
    calculateTime = (date) => {
        return moment(date).fromNow()
    };
    renderTrendingFeed = () => {
        const feed = this.props.newsFeedStore.feed;

        if(!feed){
            return (
                <View>
                    <Text>Nothing to show</Text>
                </View>
            )
        }
        return (
            Object.keys(feed).map((key, index) => (
                <View style={styles.feedSection} key={index}>
                    <Text style={styles.sectionTitle}>{key}</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {
                            feed[key].map((item, index) => (
                                <TouchableOpacity key={index} onPress={() => this.navToPost(item)}>
                                    <View style={styles.cardContainer}>
                                        <View style={styles.cardView}>
                                            <ImageCard style={{width: 120, height: 100}} image={test_images[item.background_image]}/>
                                            <View style={styles.cardInfo}>
                                                <Text>{item.post_name.slice(0, 10) + "..."}</Text>
                                                <Text style={{fontSize: 10}}>{this.calculateTime(item.created_at)}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))
                        }
                    </ScrollView>
                </View>
            ))
        )
    };
    renderFeedNav = () => {
        const views = ["list", "grid", "shared"];
        const activeView = this.props.newsFeedStore.activeFeed;

        return (
            views.map((view, index) => (
              <TouchableOpacity
                  key={index} style={styles.navButton}
                onPress={() => this.navToPost(view)}
              >
                  <Text>{view}</Text>
                  {activeView === view ? <View style={styles.activeViewLine}/> : null}
              </TouchableOpacity>
            ))
        )
    };

    componentWillMount () {
        const store = this.props.newsFeedStore;

        if(!store.feed){
            store.fetchFeed()
        }
    }

    render(){
        return (
            <Screen preset={"fixed"} backgroundColor={color.palette.white} style={SCREEN}>
                <TopNav style={styles.topNav}/>
                <Screen preset={"scroll"} style={SCROLL_SCREEN}>
                    <View style={styles.feedNav}>
                        { this.renderFeedNav() }
                    </View>
                    <View style={styles.feedContainer}>
                        { this.renderTrendingFeed() }
                    </View>
                </Screen>
            </Screen>
        )
    }

}



const styles = StyleSheet.create({
    topNav: {
        position: "absolute",
        width: "100%",
        alignItems: "center",
        paddingVertical: 0,
        top: 50,
        zIndex: 99,
        backgroundColor: color.transparent
    },
    feedNav: {
        width: "100%",
        height: 60,
        backgroundColor: color.palette.lightGrey,
        flexDirection: "row",
    },
    navButton: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    activeViewLine: {
        width: "100%",
        height: 2,
        backgroundColor: color.palette.black,
        position: "absolute",
        left: 0,
        bottom: 0,
    },
    feedContainer: {
      width: "100%",
       paddingVertical: 15,
    },
    feedSection: {
        width: "100%",
    },
    sectionTitle: {
        textAlign: "center",
        marginVertical: 15,
        textTransform: "capitalize",
        fontSize: 22,
        fontWeight: "500"
    },
    cardView: {
        flex: 1,
        borderRadius: 15,
        overflow: "hidden",
    },
    cardContainer: {
        elevation:4,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: "grey",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        marginLeft: 15,
        marginBottom: 15,
    },
    cardInfo: {
        width: "100%",
        padding: 15,
        backgroundColor: color.palette.white
    }
});
