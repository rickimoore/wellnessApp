import { Instance, types } from "mobx-state-tree"

export const MatchModel = types
    .model("User", {
        sex: types.enumeration(["male", "female"]),
        attributes: types.string,
        points: types.number,
        status: types.enumeration(["pending", "accept", "deny"])
    })
    .actions(self => {
        return {
            setSex(data) {
                self.sex = data
            },
        }
    })

export type MatchStore = Instance<typeof MatchModel>
