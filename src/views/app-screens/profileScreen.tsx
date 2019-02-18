import * as React from "react"
import { observer, inject } from "mobx-react"
import {StyleSheet, ViewStyle, View, Dimensions, ScrollView, TouchableOpacity} from "react-native"
import { Text } from "../shared/text"
import { NavigationScreenProps } from "react-navigation"
import { Screen } from "../shared/screen"
import { TopNav } from "../shared/top-nav";
import {color} from "../../theme"
import { agendaStore } from "../../stores/agendaStore";
import { ImageCard } from "../shared/image-card";

import {test_images} from "../shared/image-card/test-images";


export interface ProfileScreenProps extends NavigationScreenProps<{}> {
    agendaStore: agendaStore
}


const screenWidth = Dimensions.get("screen").width,
    screenHeight = Dimensions.get("screen").height;

const SCREEN: ViewStyle = {
    flexDirection: "column",
    marginTop: -50,
}

const SCROLL_SCREEN: ViewStyle = {
    width: screenWidth,
    minHeight: screenHeight,
    zIndex: 99,
}

@inject("agendaStore")
@observer
export class ProfileScreen extends React.Component<ProfileScreenProps, {}> {
    constructor(props){
        super(props)
        this.state = {
            // chartState: false,
        }
    }
    generateItems = () => {
        const items = Array.from(Array(7).keys());
        return (
            items.map((item, index) => {
                    const randomInt = Math.floor(Math.random() * 4);
                    return (
                        <TouchableOpacity key={index}>
                            <View style={styles.cardContainer}>
                                <View style={styles.cardView}>
                                    <ImageCard style={{width: 120, height: 100}} image={test_images[randomInt]}/>
                                    <View style={styles.cardInfo}>
                                        <Text>Demo Post</Text>
                                        <Text>{randomInt + 1} days ago</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                }
            )
        )
    }
    render () {
        return (
            <Screen preset={"fixed"} backgroundColor={color.palette.lightGrey} style={SCREEN}>
                <TopNav style={styles.topNav}/>
                <Screen preset={"scroll"} backgroundColor={color.palette.white} style={SCROLL_SCREEN}>
                    <View style={styles.profileHeader}>
                        <View style={styles.profileSection}>
                            <ImageCard style={styles.profilePicture} borderStyle={60} image={require("../shared/image-card/profile.jpg")} />
                        </View>
                        <View style={styles.profileSection}>
                            <Text style={{marginBottom: 25, fontWeight: "600"}}>Profile Name</Text>
                            <View style={styles.profileData}>
                                <View style={styles.data}>
                                    <Text style={{fontWeight: "600"}}>1,208</Text>
                                    <Text>Followers</Text>
                                </View>
                                <View style={styles.data}>
                                    <Text style={{fontWeight: "600"}}>208</Text>
                                    <Text>following</Text>
                                </View>
                            </View>
                            <View style={styles.statusSection}>
                                <Text>My Store:</Text>
                                <View style={styles.levelBar}>
                                    <View style={styles.bar}/>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.profileBody}>
                        <View style={styles.bodySection}>
                            <Text style={{fontSize: 26, marginBottom: 10,}}>My Story:</Text>
                            <Text style={{marginTop: 15,}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </Text>
                        </View>
                        <View style={styles.bodySection}>
                            <Text style={{marginBottom: 15, fontSize: 26,}}>My Remedies: </Text>
                            <View>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                    {this.generateItems()}
                                </ScrollView>
                            </View>
                            <Text style={{marginBottom: 15, fontSize: 26,}}>My Posts: </Text>
                            <View>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                    {this.generateItems()}
                                </ScrollView>
                            </View>
                        </View>
                        <View style={styles.bodySection}>

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
      zIndex: 99,
      backgroundColor: color.transparent
    },
    profileHeader: {
        backgroundColor: color.palette.lightGrey,
        paddingTop: 100,
        padding: 25,
        alignSelf: "stretch",
        flexDirection: "row",
    },
    profileBody: {
      padding: 15,
      marginBottom: 25,
    },
    profileSection: {
        flex: 1,
    },
    profileData: {
        flexDirection: "row"
    },
    data: {
        marginRight: 15,
    },
    profilePicture: {
        marginLeft: 5,
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    statusSection: {
      alignSelf: "stretch",
        marginTop: 15,
    },
    levelBar: {
        width: "100%",
        marginTop: 10,
        height: 6,
        backgroundColor: color.palette.lighterGrey,
        borderRadius: 5,
    },
    bar: {
        position: "absolute",
        left: 0,
        top: 0,
        height: 6,
        width: "45%",
        backgroundColor: color.primaryDarker,
        borderRadius: 5,
    },
    bodySection: {
        marginTop: 15,
    },
    postCard: {
        width: 50,
        height: 50,
        marginRight: 15,
        borderRadius: 10,
    },
    postContainer: {
        flexDirection: "row",
        marginRight: 15,
    },
    picture: {
        width: 100,
        height: 200,
        borderRadius: 10,
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
})
