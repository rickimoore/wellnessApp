import { types } from "mobx-state-tree"

export const onBoardingStore = types
    .model("onBoardingStore")
    .props({
        isValidatedUser: types.boolean,
    })
    .actions(self => {
        return {
            validateUser() {
                self.isValidatedUser = true
            },
        }
    })
    .actions(self => {
        return {
            // resumeGame(): void {
            //     const uiStore = getRoot<RootStore>(self).uiStateStore;
            //     uiStore.hideGameOver();
            //     self.isGameRunning = true;
            //     self.isPaused = false;
            // },
        }
    })

export type onBoardingStore = typeof onBoardingStore.Type
