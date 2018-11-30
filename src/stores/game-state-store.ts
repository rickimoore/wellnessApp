import { types, getRoot } from "mobx-state-tree"
import { RootStore } from "../app/root-store"

export const GameStateStore = types
    .model("UiState")
    .props({
        gameTimer: types.number
    })
    .actions(self => {
        return {
            endGame() {
                const uiStore = getRoot<RootStore>(self).uiStateStore
                self.gameTimer = 0
                uiStore.showGameOver()
            },
        }
    })

export type GameStateStore = typeof GameStateStore.Type
