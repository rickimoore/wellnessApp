import {types, getSnapshot, getRoot, getEnv} from "mobx-state-tree"
import { Post } from "../models/post";
import { RootStore } from "../app/root-store";
import { Feed } from "../models/feed";


export const newsFeedStore = types
    .model("newsFeedStore")
    .props({
        activeFeed: types.enumeration("state", ["list", "grid", "shared"]),
        activePost: types.maybe(types.reference(Post)),
        feed: types.maybe(Feed),
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
            setTrendingFeed: (feed) => {
                self.feed = feed;
            }
        }
    })
    .actions(self => {
        return {
            fetchFeed() {
                return new Promise((resolve, reject) => {
                    getEnv(self).api.fetchFeed(getRoot<RootStore>(self).userStore.userToken.access_token).then((result) => {
                        self.setTrendingFeed(result.data);
                        resolve(result)
                    }).catch((error) => reject(error.response))
                })
            },
            setActivePost (post) {
                return new Promise((resolve) => {
                    self.activePost = post;
                    resolve();
                })
            }
        }
    })

export type newsFeedStore = typeof newsFeedStore.Type
