import * as React from "react"
import {
    View,
    ViewStyle,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    BackHandler,
    CameraRoll
} from "react-native"
import {NavigationScreenProps} from "react-navigation";
import { inject, observer } from "mobx-react/native"
import { PostStore } from "../../stores/postStore";
import {Screen} from "../shared/screen";
import {color} from "../../theme";
import { Button } from "../shared/button";
import CameraRollModal from "../modals/camera-roll"

export interface PostCreationModalProps extends NavigationScreenProps<{}>{
    navCallBack: Function
    restart: Function
    postStore: PostStore
}

const SCREEN: ViewStyle = {
    flexDirection: "column",
    // flex: 1,
}

@inject("postStore")
@observer
export class PostScreen extends React.Component<PostCreationModalProps, {description, text, cameraRoll}> {
    constructor(props){
        super(props)
        this.state = {
            text: '',
            cameraRoll: ''
        }
    }

    submitContent = () => {
        if(!this.isContentValid()){
            return console.log('make an alert for this...')
        }

        this.props.postStore.savePost().then((result) => {
            console.log(result)
        }).catch((error) => {
            console.log(error.response, '----error')
        })
    };

    getPhotosFromGallery = () => {
        const store = this.props.postStore;
      CameraRoll.getPhotos({first: 1000000, assetType: 'All'}).then((res) => {
          store.setCameraRoll(res.edges.map((image) => ({image: image.node.image.uri, isSelected: false})));
          this.setState({ cameraRoll: res.edges });
          setTimeout(() => {
              this.props.postStore.toggleModal(true);
          }, 0)
      })
    };

    isContentValid = () => {
      return this.props.postStore.postText;
    };
    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", () => true)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", () => true)
    }
    render () {
        const store = this.props.postStore;
        return (
            <Screen  backgroundColor={color.palette.white} style={SCREEN}>
                <CameraRollModal />
                <TouchableOpacity style={styles.textContainer} onPress={() => this.state.text.focus()}>
                    <TextInput
                        style={styles.text}
                        multiline={true}
                        numberOfLines={4}
                        autoFocus={true}
                        ref={(input) => { this.state.text = input; }}
                        placeholder={"Speak to your Audience..."}
                        onChangeText={(text) => store.saveText(text)}
                        value={store.postText}/>
                </TouchableOpacity>
                <View style={styles.postActions}>
                    <Button preset={"clear"} text={"Add Photo"} style={StyleSheet.flatten([styles.actionStyle, styles.imageAction])} onPress={() => this.getPhotosFromGallery()} />
                    <Button preset={"clear"} text={"Add Video"} style={StyleSheet.flatten([styles.actionStyle, styles.videoAction])} />
                    <Button preset={"clear"} text={"Submit"} onPress={() => this.submitContent()} style={styles.actionStyle} />
                </View>
            </Screen>
        )
    }
}

const styles = StyleSheet.create({
    textContainer: {
        borderWidth: 1,
        borderColor: color.palette.lighterGrey,
        borderRadius: 5,
        alignSelf: "stretch",
        height: 300,
        margin: 15,
        padding: 15,
    },
    postActions: {
        padding: 15,
        alignSelf: 'stretch',
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    actionStyle: {
        width: "100%",
        marginTop: 15,
        borderRadius: 5,
    },
    imageAction: {
      borderColor: "#8BB381"
    },
    videoAction: {
        borderColor: "#56A5EC"
    },
    text: {
        padding: 15,
        alignSelf: 'stretch'
    }
})