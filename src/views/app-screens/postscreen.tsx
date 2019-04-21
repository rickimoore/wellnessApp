import * as React from "react";
import {NavigationScreenProps} from "react-navigation";

import { Screen } from "../shared/screen"
import { TopNav } from "../shared/top-nav";
import { Text } from "../shared/text";
import { ImageCard } from "../shared/image-card";

import { newsFeedStore } from "../../stores/newsFeedStore";
import {color} from "../../theme";
import {Dimensions, StyleSheet, ViewStyle, View, FlatList} from "react-native";
import {inject, observer} from "mobx-react";
import { test_images } from "../shared/image-card/test-images";



export interface PostScreenProps extends NavigationScreenProps<{}> {
    newsFeedStore: newsFeedStore
}

const SCREEN: ViewStyle = {
    flexDirection: "column",
    marginTop: -50,
}

const screenWidth = Dimensions.get("screen").width,
        screenHeight = Dimensions.get("screen").height;

const OVERLAY_SCREEN: ViewStyle = {
    width: screenWidth,
    minHeight: screenHeight / 2,
    zIndex: 99,
    paddingTop: screenHeight / 1.6,
}

@inject("newsFeedStore")
@observer
export class PostScreen extends React.Component<PostScreenProps> {
    returnDummyItems = () => {
        const count = Array.from(Array(7).keys());

        return (
            count.map((value, index) => (
                {text: "Do this and that", key: index + "key"}
            ))
        )
    }
    render(){
        const store = this.props.newsFeedStore;
        return (
            <Screen preset={"fixed"} backgroundColor={color.palette.white} style={SCREEN}>
                <TopNav back={() => this.props.navigation.navigate("FeedStack")} style={styles.topNav}/>
                <View style={styles.postHeadBoard}>
                    <ImageCard style={styles.postPicture} image={test_images[store.activePost.background_image]} />
                </View>
                <Screen preset={"scroll"} style={OVERLAY_SCREEN}>
                    <View style={styles.postCardContainer}>
                        <View style={StyleSheet.flatten([styles.stretchedRow, styles.postHeader])}>
                            <Text>{store.activePost.post_name}</Text>
                            <Text>{store.activePost.likes} likes</Text>
                        </View>
                        <View style={StyleSheet.flatten([styles.stretchedRow, styles.postInfo])}>
                            <View>
                                <Text style={styles.descriptor}>Time</Text>
                                <Text>30min</Text>
                            </View>
                            <View>
                                <Text style={styles.descriptor}>Type</Text>
                                <Text>Relax</Text>
                            </View>
                            <View>
                                <Text style={styles.descriptor}>Rating</Text>
                                <Text>5 stars</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.subTitle}>Description</Text>
                            <Text>{store.activePost.description}</Text>
                        </View>
                        <View style={{marginTop: 30}}>
                            <Text style={styles.subTitle}>Instructions</Text>
                            <FlatList data={this.returnDummyItems()}
                             renderItem={({item, index}) => <Text style={{marginBottom: 10}} key={index}>{index + 1}. {item.text}</Text>}
                            />
                        </View>
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
        top: 100,
        zIndex: 999,
        backgroundColor: color.transparent
    },
    postHeadBoard: {
        width: "100%",
        position: "absolute"
    },
    postPicture: {
        width: screenWidth,
        height: screenHeight / 1.4
    },
    postCardContainer: {
        width: "100%",
        backgroundColor: color.palette.white,
        borderRadius: 15,
        padding: 30,
        minHeight: 300,
        flexDirection: "column"
    },
    stretchedRow: {
        alignSelf: "stretch",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    postHeader: {
        paddingBottom: 30,
        borderBottomWidth: 1,
        borderBottomColor: color.palette.lighterGrey
    },
    postInfo: {
        paddingVertical: 15,
    },
    descriptor: {
        marginBottom: 10,
        color: color.palette.darkGrey
    },
    subTitle: {marginBottom: 10, fontWeight: "600", color: color.palette.darkGrey}
});
