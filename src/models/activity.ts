import { types } from "mobx-state-tree"

export const Activity = types
    .model("Activity")
    .props({
        type: types.string,
    });

export type agendaStore = typeof Activity.Type
