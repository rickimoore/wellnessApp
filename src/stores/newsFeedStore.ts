import {types, getSnapshot, applySnapshot, getEnv} from "mobx-state-tree"


export const newsFeedStore = types
    .model("newsFeedStore")
    .props({
        activeFeed: types.enumeration("state", ["list", "grid", "shared"])
    })
    .actions( self => {
        let initialState = {};
        return {
            afterCreate: () => {
                if(!initialState) {
                    initialState = getSnapshot(self)
                }
            },
            setActiveFeed: (feed) => {
                self.activeFeed = feed;
            },
        }
    })
    .actions(self => {
        return {
            clearQuery(): void {

            }
        }
    })

export type newsFeedStore = typeof newsFeedStore.Type
