import { types } from "mobx-state-tree"
import { Day } from "./day";

export const DayList = types
    .model("DayList")
    .props({
        days: types.array(Day)
    })
    .actions(self => {
        return {
            add(day) {
                self.days.push(day)
            },
        }
    })

export type agendaStore = typeof DayList.Type
