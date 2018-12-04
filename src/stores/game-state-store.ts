import { types, getRoot } from "mobx-state-tree"
import { RootStore } from "../app/root-store"
import { AttributesModel, MatchModel } from "../models";

export const GameStateStore = types
    .model("UiState")
    .props({
        isGameRunning: types.boolean,
        attributes: types.maybe(AttributesModel),
        level: types.optional(types.number, 1),
        matches: types.maybe(MatchModel)
    })
    .actions(self => {
        return {
            increaseLevel() {
                self.level = self.level + 1
            }
        }
    })
    .actions(self => {
        return {
            endGame(): void {
                const uiStore = getRoot<RootStore>(self).uiStateStore;
                self.isGameRunning = false;
                uiStore.showGameOver()
            },
            startGame(callBack): void {
                self.isGameRunning = true;
                callBack()
            }
        }
    });

export type GameStateStore = typeof GameStateStore.Type
