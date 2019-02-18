import * as React from "react"
import {
    StyleSheet,
    Modal,
    View,
    SafeAreaView,
    BackHandler,
} from "react-native"
import { Text } from "../shared/text"
import { inject, observer } from "mobx-react/native"
import {NavigationScreenProps} from "react-navigation";
import {color, spacing} from "../../theme";
import { agendaStore } from "../../stores/agendaStore";
import  { Button } from "../shared/button";
import {CircularProgress} from 'react-native-svg-circular-progress'
// import { Icon } from "../shared/icon"
// import { translate } from "../../i18n"

export interface AgendaModalProps extends NavigationScreenProps<{}>{
    agendaStore: agendaStore,
}

@inject("agendaStore")
@observer
export class AgendaModal extends React.Component<AgendaModalProps, {}> {
    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", () => true)
    }
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", () => true)
    }
    render() {
        const store = this.props.agendaStore
        return (
            <Modal animationType="slide" visible={store.isActiveDayModal} onRequestClose={() => {}}>
                <SafeAreaView style={styles.page}>
                    <View style={styles.headerText}>
                        <Text style={styles.header}>Barbell Bench Press</Text>
                    </View>
                    <View style={styles.counter}>
                        <CircularProgress blankColor={color.palette.lightGrey} progressWidth={120} size={250}
                                          donutColor={color.palette.lightPurple} percentage={40}>
                            <View>
                                <Text>40%</Text>
                            </View>
                        </CircularProgress>
                    </View>
                    <View style={styles.dayActions}>
                        <Button text={"Stop"} style={styles.actionButton}
                                textStyle={{padding: 0, fontSize: 14,}} onPress={() => store.toggleDayModal(false)}/>
                        <Button preset={"clear"} text={"Next Training"} style={styles.actionButton}
                                textStyle={{padding: 0, fontSize: 14,}} onPress={() => store.toggleDayModal(false)}/>
                    </View>
                    <View style={styles.nextContainer}>
                        <Text>Next: Next Workout</Text>
                        <Text>This is a tiny description</Text>
                    </View>
                </SafeAreaView>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        alignItems: "center",
        flex: 1,
        backgroundColor: color.palette.white
    },
    exitIcon: {
        alignSelf: "flex-end",
        marginBottom: 20,
    },
    headerText: {
        paddingHorizontal: 40,
        paddingVertical: 25,
    },
    header: {
      fontSize: 32,
        fontWeight: "500",
        textAlign: "center"
    },
    dayActions: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "stretch",
        justifyContent: "space-around",
        marginBottom: 10,
        marginTop: spacing[7],
        paddingHorizontal: 30,
    },
    counter: {
        alignSelf: "stretch",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "50%",
    },
    actionButton: { flex: 1, marginHorizontal: 10, paddingHorizontal:0, paddingVertical: 14},
    nextContainer: {
        alignSelf: "center",
        flexDirection: "column",
        alignItems: "center",
        marginTop: spacing[5],
    }
})
