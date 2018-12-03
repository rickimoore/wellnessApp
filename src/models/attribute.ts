import { Instance, types } from "mobx-state-tree"

export const AttributesModel = types
    .model("User", {
        first: types.optional(types.string, ""),
        second: types.optional(types.string, ""),
        third: types.optional(types.string, ""),
        fourth: types.optional(types.string, ""),
        fifth: types.optional(types.string, "")
    })
    .actions(self => {
        return {
            setAttribute(id, data) {
                self[id] = data
            },
        }
    })

export type AttributeStore = Instance<typeof AttributesModel>
