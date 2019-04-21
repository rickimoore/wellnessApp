import {getEnv, getRoot, types} from "mobx-state-tree"
import {RootStore} from "../app/root-store";

const Image = types
    .model("Image", {
        image: types.string,
        isSelected: types.boolean,
    });

export const PostStore = types
    .model("PostStore")
    .props({
        isPostModal: types.boolean,
        isCameraRollModal: types.boolean,
        cameraRoll: types.maybe(types.array(Image)),
        postText: types.maybe(types.string),
    })
    .actions(self => {
        return {
            toggleModal(boolean) {
                self.isCameraRollModal = boolean
            },
            setCameraRoll(roll){
              self.cameraRoll = roll;
            },
            saveText(text) {
                self.postText = text
            },
            toggleCameraRollSelection(selection) {
                self.cameraRoll[selection].isSelected = !self.cameraRoll[selection].isSelected
            }
        }
    })
    .actions(self => {
        return {
            savePost(){
                const accessToken = getRoot<RootStore>(self).userStore.userToken.access_token;
                const content = {
                  text: self.postText
                };
                return new Promise((resolve, reject) => {
                    getEnv(self).api.postContent(accessToken, content).then((result) => {
                        resolve(result)
                    }).catch((error) => reject(error))
                });
            },
        }
    })

export type PostStore = typeof PostStore.Type
