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
// import { Icon } from "../shared/icon"
// import { translate } from "../../i18n"

export interface GameOverModalProps extends NavigationScreenProps<{}>{
    uiStateStore: UiStateStore
}

@inject("uiStateStore")
@observer
export class GameOverModal extends React.Component<GameOverModalProps, {}> {
    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", () => true)
    }
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", () => true)
    }
    render() {
        const store = this.props.uiStateStore
        return (
            <Modal animationType="slide" visible={store.isGameOverModal} onRequestClose={() => {}}>
                <Wallpaper />
                <SafeAreaView style={styles.page}>
                    <View style={styles.pageHeader}>
                        <TouchableOpacity style={styles.exitIcon} onPress={() => store.hideGameOver()}>
                            <Text>X</Text>
                        </TouchableOpacity>
                        <Text preset={"header"} style={{ fontSize: 27 }}>
                            Game Over
                        </Text>
                    </View>
                    <Text>
                        You lose!
                    </Text>
                    <View style={styles.termActions}>
                        <Button preset={"primary"} style={styles.actionButton} onPress={() => store.hideGameOver()}>
                            <Text preset={"bold"} style={{ color: "white" }}>
                                Play Again
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
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
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
