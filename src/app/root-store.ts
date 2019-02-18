import { types } from "mobx-state-tree"
import { NavigationStoreModel } from "../navigation/navigation-store";
import { onBoardingStore } from "../stores/onboarding";
import { agendaStore } from "../stores/agendaStore";
import { nutritionStore } from "../stores/nutritionStore";
import { newsFeedStore } from "../stores/newsFeedStore";

/**
 * An RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
    navigationStore: types.optional(NavigationStoreModel, {}),
    onBoardingStore: types.optional(onBoardingStore, {isValidatedUser: false}),
    agendaStore: types.optional(agendaStore, {isActiveDayModal: false}),
    nutritionStore: types.optional(nutritionStore, {}),
    newsFeedStore: types.optional(newsFeedStore, { activeFeed: "list" })
})

/**
 * The RootStore instance.
 */
export type RootStore = typeof RootStoreModel.Type

/**
 * The data of an RootStore.
 */
export type RootStoreSnapshot = typeof RootStoreModel.SnapshotType
