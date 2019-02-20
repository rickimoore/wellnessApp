import * as React from "react"
import { observer, inject } from "mobx-react"
import {StyleSheet, ViewStyle, View} from "react-native"
import { Text } from "../shared/text"
import { NavigationScreenProps } from "react-navigation"
import { Screen } from "../shared/screen"
import {color} from "../../theme"
import { userStore } from "../../stores/userStore";
import { ImageCard } from "../shared/image-card";
import { Button } from "../shared/button";
import { TextField } from "../shared/text-field";


export interface OnboardingScreenProps extends NavigationScreenProps<{}> {
    userStore: userStore
}


// const screenWidth = Dimensions.get("screen").width,
//     screenHeight = Dimensions.get("screen").height;

const SCREEN: ViewStyle = {
    flexDirection: "column",
    // flex: 1,
}

@inject("userStore")
@observer
export class OnboardingScreen extends React.Component<OnboardingScreenProps, {email, password, name, password_confirmation, hasAccount}> {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            hasAccount: false,
        }
    }
    registerUser = () => {
        this.props.userStore.registerUser({
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation
        })
    }
    loginUser = async () => {
        const store = this.props.userStore;
        let result = await store.loginUser({
            username: this.state.email,
            password: this.state.password,
        })

        if (result) {
            store.getUser().then(() => {
                this.props.navigation.navigate("mainStack")
            })
        }
    }
    componentWillMount(){
        if(this.props.userStore.user){
            this.props.navigation.navigate("mainStack")
        }
    }
    renderAuthentication () {
        if(this.state.hasAccount){
            return (
                <View>
                    <TextField style={styles.inputStyle}
                               onChangeText={(email) => this.setState({email})}
                               value={this.state.email}
                               placeholder={"Your Email"} />
                    <TextField style={styles.inputStyle}
                               onChangeText={(password) => this.setState({password})}
                               value={this.state.password}
                               secureTextEntry={true} placeholder={"Password"} />
                </View>
            )

        } else {
            return (
                <View>
                    <TextField style={styles.inputStyle}
                               onChangeText={(name) => this.setState({name})}
                               value={this.state.name}
                               placeholder={"Your Name"} />
                    <TextField style={styles.inputStyle}
                               onChangeText={(email) => this.setState({email})}
                               value={this.state.email}
                               placeholder={"Your Email"} />
                    <TextField style={styles.inputStyle}
                               onChangeText={(password) => this.setState({password})}
                               value={this.state.password}
                               secureTextEntry={true} placeholder={"Password"} />
                    <TextField style={styles.inputStyle}
                               onChangeText={(password_confirmation) => this.setState({password_confirmation})}
                               value={this.state.password_confirmation}
                               secureTextEntry={true} placeholder={"Confirm Password"} />
                </View>
            )
        }
    }
    renderAuthActions () {
        if(this.state.hasAccount){
            return (
              <View style={styles.onBoardingAction}>
                  <Button onPress={() => this.loginUser()}  preset={"clear"} style={StyleSheet.flatten([styles.onBoardingBtn, styles.darkerBtn])} textStyle={styles.darkerText} text={"Login"}/>
                  <Button style={styles.onboardOption} onPress={() => this.setState({hasAccount: false})} preset={"link"} text={"Create an account"}/>
              </View>
            )
        } else {
            return (
                <View style={styles.onBoardingAction}>
                    <Button onPress={() => this.registerUser()} style={styles.onBoardingBtn} text={"Create Account"}/>
                    <Button style={styles.onboardOption} onPress={() => this.setState({hasAccount: true})} preset={"link"} text={"Already have an account?"}/>
                </View>
            )
        }
    }
    render () {
        return (
            <Screen preset={"fixed"} backgroundColor={color.palette.white} style={SCREEN}>
                <ImageCard style={StyleSheet.flatten([styles.headImage, styles.headImageStyle])} image={require("./headerImage.jpg")}>
                    <Text style={styles.headerTextStyle}>Remedy your way back to health with connective care</Text>
                </ImageCard>
                    <View style={styles.onBoardingContainer}>
                        {this.renderAuthentication()}
                        {this.renderAuthActions()}
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
    onboardOption: {
        marginTop: 10,
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
