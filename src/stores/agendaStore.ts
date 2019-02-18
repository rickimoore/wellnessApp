import {types, getSnapshot, applySnapshot, destroy, getEnv} from "mobx-state-tree"
import {Day} from "../models/day";



export const agendaStore = types
    .model("agendaStore")
    .props({
        activeDay: types.maybe(types.number),
        isActiveDayModal: types.boolean,
        dayList: types.optional(types.array(Day), []),
    })
    .actions( self => {
        let initialState = {};
        return {
            afterCreate: () => {
              initialState = getSnapshot(self)
            },
            reset: () => {
              applySnapshot(self, initialState)
            },
            toggleDayModal(value){
                self.isActiveDayModal = value
            },
            addDayToList(data) {
                self.dayList.push(data)
            },
            addTodo(day) {
                self.dayList.unshift(day)
            },
            setActiveDay (day) {
                self.activeDay = day
            },
        }
    })
    .actions(self => {
        return {
            // getRecipeList(recipe): void {
            //     getEnv(self).api.getRecipes(recipe).then((result) => {
            //         console.log(result)
            //     })
            // },
        }
    })

export type agendaStore = typeof agendaStore.Type
