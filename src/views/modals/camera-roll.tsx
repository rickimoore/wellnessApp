import React from 'react';
import {Modal, TouchableOpacity, View, Image, StyleSheet, FlatList, Text} from 'react-native';
import {PostStore} from "../../stores/postStore";
import {NavigationScreenProps} from "react-navigation";
import {inject, observer} from "mobx-react/native";
import {Button} from "../shared/button"

export interface CameraRollModalProps extends NavigationScreenProps<{}>{
    postStore: PostStore
}

@inject("postStore")
@observer
export default class CameraRollModal extends React.Component<CameraRollModalProps>{
    constructor(props){
        super(props)
        this.state = {
            selectedItems: []
        }
    }
    updateImage = (index) => {
        console.log('touch....')
        this.props.postStore.toggleCameraRollSelection(index);
    }
    renderHighlightedImageBlock = (item, index) => {
        const style = item.isSelected ? { flex: 1, flexDirection: 'column', margin: 1, borderWidth: 4, borderRadius: 5, borderColor: '#0084FF' } :
            { flex: 1, flexDirection: 'column', margin: 1}
        return (
            <TouchableOpacity onPress={() => this.updateImage(index)} key={item.image} style={{...style}}>
                <Image style={styles.imageThumbnail} source={{ uri: item.image }} />
            </TouchableOpacity>
        )
    };
    renderFeed = () => {
        const store = this.props.postStore;
        return store.cameraRoll ? (
            <FlatList
                data={store.cameraRoll}
                numColumns={3}
                initialNumToRender={18}
                renderItem={({ item, index }) => this.renderHighlightedImageBlock(item, index)}
                keyExtractor={(item, index) => index.toString()}
                extraData={this.props}
            />
        ) : null;
    };
    render() {
        const store = this.props.postStore;
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={store.isCameraRollModal}
                onRequestClose={() => {
                }}>
                <View style={{marginTop: 22}}>
                    <View>
                        <Button text={'close'} onPress={() => {store.toggleModal(false)}} />
                        {this.renderFeed()}
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
  roll: {
      flexDirection: 'row'
  },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
    }
})