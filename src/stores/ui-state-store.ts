import { types } from "mobx-state-tree"

export const UiStateStore = types
  .model("UiState")
  .props({
    isGameOverModal: types.optional(types.boolean, false),
    isInstructionModal: types.optional(types.boolean, false),
  })
  .actions(self => {
    return {
      showGameOver() {
        self.isGameOverModal = true
      },
      hideGameOver() {
          self.isGameOverModal = false
      },
      showInstructions() {
          self.isInstructionModal = true
      },
      hideInstructions() {
          self.isInstructionModal = false
      },

    }
  })

export type UiStateStore = typeof UiStateStore.Type
