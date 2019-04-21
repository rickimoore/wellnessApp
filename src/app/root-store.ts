import { types } from "mobx-state-tree"
import { NavigationStoreModel } from "../navigation/navigation-store";
import { onBoardingStore } from "../stores/onboarding";
import { userStore } from "../stores/userStore";
import { nutritionStore } from "../stores/nutritionStore";
import { newsFeedStore } from "../stores/newsFeedStore";
import { PostStore } from "../stores/postStore";

/**
 * An RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
    navigationStore: types.optional(NavigationStoreModel, {}),
    onBoardingStore: types.optional(onBoardingStore, {isValidatedUser: false}),
    userStore: types.optional(userStore, {}),
    nutritionStore: types.optional(nutritionStore, {}),
    newsFeedStore: types.optional(newsFeedStore, { activeFeed: "list" }),
    postStore: types.optional(PostStore, {isPostModal: false, isCameraRollModal: false})
})

/**
 * The RootStore instance.
 */
export type RootStore = typeof RootStoreModel.Type

/**
 * The data of an RootStore.
 */
export type RootStoreSnapshot = typeof RootStoreModel.SnapshotType
