import {types, getSnapshot, applySnapshot, destroy, getEnv} from "mobx-state-tree"
import {UserTokenModel, UserModel} from "../models/user";


export const userStore = types
    .model("userStore")
    .props({
        userToken: types.maybe(UserTokenModel),
        user: types.maybe(UserModel)
    })
    .actions(self => {
        let initialState = {};
        return {
            afterCreate: () => {
                initialState = getSnapshot(self)
            },
            reset: () => {
                applySnapshot(self, initialState)
            },
            setUserToken: (user) => {
                self.userToken = user;
            },
            setUser: (user) => {
                self.user = user
            }
        }
    })
    .actions(self => {
        return {
            registerUser(data): void {
                getEnv(self).api.registerUser(data).then((result) => {
                    console.log(result)
                })
            },
            getUser(){
                return new Promise((resolve, reject) => {
                    getEnv(self).api.fetchUser(self.userToken.access_token).then((result) => {
                        self.setUser(result.data)
                        resolve(result)
                    }).catch((error) => reject(error))
                });
            },
            loginUser(data) {
                return new Promise((resolve, reject) => {
                    getEnv(self).api.fetchUserToken(data).then((result) => {
                        self.setUserToken(result.data)
                        resolve(result)
                    }).catch(() => reject())
                })
            }
        }
    })

export type userStore = typeof userStore.Type
