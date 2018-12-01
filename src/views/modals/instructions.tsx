import * as React from "react"
import {
    StyleSheet,
    View,
    Modal,
    TouchableOpacity,
    SafeAreaView,
    BackHandler,
} from "react-native"
import { Text } from "../shared/text"
import { Button } from "../shared/button"
import { inject, observer } from "mobx-react/native"
import { UiStateStore } from "../../stores"
import { Wallpaper } from "../shared/wallpaper";
import {NavigationScreenProps} from "react-navigation";
import {color} from "../../theme";
// import { Icon } from "../shared/icon"
// import { translate } from "../../i18n"

export interface InstructionsModalProps extends NavigationScreenProps<{}>{
    uiStateStore: UiStateStore
}

@inject("uiStateStore")
@observer
export class InstructionsModal extends React.Component<InstructionsModalProps, {}> {
    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", () => true)
    }
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", () => true)
    }
    render() {
        const store = this.props.uiStateStore
        return (
            <Modal animationType="slide" visible={store.isInstructionModal} onRequestClose={() => {}}>
                <SafeAreaView style={styles.page}>
                    <View style={styles.pageHeader}>
                        <TouchableOpacity style={styles.exitIcon} onPress={() => store.hideInstructions()}>
                            <Text>X</Text>
                        </TouchableOpacity>
                        <Text preset={"header"} style={{ fontSize: 27 }}>
                            Instructions
                        </Text>
                    </View>
                    <Text>
                        Instructions here
                    </Text>
                    <View style={styles.termActions}>
                        <Button preset={"primary"} style={styles.actionButton} onPress={() => store.hideInstructions()}>
                            <Text preset={"bold"} style={{ color: "white" }}>
                                Back
                            </Text>
                        </Button>
                    </View>
                </SafeAreaView>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: color.palette.pastelDarkPink,
        flexDirection: "column",
        justifyContent: "flex-end",
        flex: 1,
    },
    pageHeader: {
        flexDirection: "column",
        marginBottom: 20,
    },
    exitIcon: {
        alignSelf: "flex-end",
        marginBottom: 20,
    },
    termActions: {
        height: 100,
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 26,
        marginBottom: 10,
    },
    actionButton: { backgroundColor: "blue" },
    actionButtonIcon: { marginRight: 10 },
})
