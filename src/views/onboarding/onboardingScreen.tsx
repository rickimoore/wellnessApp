import * as React from "react"
import { observer, inject } from "mobx-react"
import {StyleSheet, ViewStyle, View} from "react-native"
import { Text } from "../shared/text"
import { NavigationScreenProps } from "react-navigation"
import { Screen } from "../shared/screen"
import {color} from "../../theme"
import { agendaStore } from "../../stores/agendaStore";
import { ImageCard } from "../shared/image-card";
import { Button } from "../shared/button";
import { TextField } from "../shared/text-field";


export interface OnboardingScreenProps extends NavigationScreenProps<{}> {
    agendaStore: agendaStore
}


// const screenWidth = Dimensions.get("screen").width,
//     screenHeight = Dimensions.get("screen").height;

const SCREEN: ViewStyle = {
    flexDirection: "column",
    // flex: 1,
}

@inject("agendaStore")
@observer
export class OnboardingScreen extends React.Component<OnboardingScreenProps, {}> {
    constructor(props){
        super(props)
        this.state = {
            // chartState: false,
        }
    }
    render () {
        return (
            <Screen preset={"fixed"} backgroundColor={color.palette.white} style={SCREEN}>
                <ImageCard style={StyleSheet.flatten([styles.headImage, styles.headImageStyle])} image={require("./headerImage.jpg")}>
                    <Text style={styles.headerTextStyle}>Remedy your way back to health with connective care</Text>
                </ImageCard>
                    <View style={styles.onBoardingContainer}>
                    <TextField style={styles.inputStyle} placeholder={"Your Email"} />
                    <TextField style={styles.inputStyle} secureTextEntry={true} placeholder={"Password"} />
                    <View style={styles.onBoardingAction}>
                        <Button onPress={() => this.props.navigation.navigate("mainStack")} style={styles.onBoardingBtn} text={"Create Account"}/>
                        <Button onPress={() => this.props.navigation.navigate("mainStack")}  preset={"clear"} style={StyleSheet.flatten([styles.onBoardingBtn, styles.darkerBtn])} textStyle={styles.darkerText} text={"SignUp with Facebook"}/>
                    </View>
                    <Text style={styles.terms}>Terms of Use and Privacy</Text>
                </View>
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
    headImageStyle: {flexDirection: "column", justifyContent: "flex-end", padding: 40},
    headImage: {
        marginTop: -50,
        height: 300
    },
    headerTextStyle: {fontSize: 26, color: color.palette.white, fontWeight: "bold"},
    onBoardingContainer: {
        flex: 1,
        alignSelf: "stretch",
        paddingVertical: 25,
        paddingHorizontal: 35,
    },
    inputStyle: {
        borderBottomColor: color.palette.lighterGrey,
        borderBottomWidth: 1,
    },
    onBoardingAction: {
      marginTop: 25,
    },
    onBoardingBtn: {
        marginTop: 10,
        paddingVertical: 15,
    },
    darkerBtn:{
        borderColor: color.palette.darkGrey,
    },
    darkerText: {
        color: color.palette.darkGrey
    },
    terms: {
        position: "absolute",
        alignSelf: "center",
        bottom: 0,
        fontSize: 12,
    },
})
