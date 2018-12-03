import { types } from "mobx-state-tree"
import { NavigationStoreModel } from "../navigation/navigation-store"
import { UiStateStore } from "../stores"
import {GameStateStore} from "../stores/game-state-store";

/**
 * An RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
    uiStateStore: types.optional(UiStateStore, {}),
    gameStateStore: types.optional(GameStateStore, { isGameRunning: false }),
    navigationStore: types.optional(NavigationStoreModel, {}),
})

/**
 * The RootStore instance.
 */
export type RootStore = typeof RootStoreModel.Type

/**
 * The data of an RootStore.
 */
export type RootStoreSnapshot = typeof RootStoreModel.SnapshotType
