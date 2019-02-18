import {types, getSnapshot, applySnapshot, getEnv} from "mobx-state-tree"
import { NutritionResult } from "../models/nutritionResult";


export const nutritionStore = types
    .model("nutritionStore")
    .props({
        something: types.maybe(types.string),
        queryResults: types.optional(types.array(NutritionResult), [])
    })
    .actions( self => {
        let initialState = {};
        return {
            afterCreate: () => {
                if(!initialState) {
                    initialState = getSnapshot(self)
                }
            },
            reset: () => {
                applySnapshot(self, initialState)
            },
            setResults: (data) => {
                self.queryResults.push(data)
            },

        }
    })
    .actions(self => {
        return {
            getRecipeList(recipe): void {
                getEnv(self).api.getRecipes(recipe).then((result) => {
                    const data = result.data.hits;
                    data.map((item) => {
                        const recipe = item.recipe;
                        self.setResults({
                            calories: recipe.calories,
                            label: recipe.label,
                            healthLabels: recipe.healthLabels,
                            ingredients: recipe.ingredientLines,
                            cookTime: recipe.totalTime,
                            image: recipe.image,
                            url: recipe.url,
                        })
                    })
                })
            },
            clearQuery(): void {

            }
        }
    })

export type nutritionStore = typeof nutritionStore.Type
