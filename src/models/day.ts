import { types } from "mobx-state-tree"
import { Activity } from "./activity";

export const Day = types
    .model("Day")
    .props({
        day: types.string,
        display: types.string,
        activities: types.array(Activity)
    });

export type agendaStore = typeof Day.Type
