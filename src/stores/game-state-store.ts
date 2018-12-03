import { types, getRoot } from "mobx-state-tree"
import { RootStore } from "../app/root-store"
import { AttributesModel, MatchModel } from "../models";

export const GameStateStore = types
    .model("UiState")
    .props({
        isGameRunning: types.boolean,
        attributes: types.maybe(AttributesModel),
        matches: types.maybe(MatchModel)
    })
    .actions(self => {
        return {
            endGame(): void {
                const uiStore = getRoot<RootStore>(self).uiStateStore
                self.isGameRunning = false
                self.gameTimer = 0
                uiStore.showGameOver()
            },
            startGame(callBack): void {
                self.isGameRunning = true;
                callBack()
            }
        }
    })

export type GameStateStore = typeof GameStateStore.Type
