import { types } from "mobx-state-tree"

export const NutritionResult = types
    .model("NutritionResult")
    .props({
       label: types.string,
       calories: types.number,
       healthLabels: types.array(types.string),
       ingredients: types.array(types.string),
       cookTime: types.number,
       image: types.string,
       url: types.string,
    });

export type NutritionResult = typeof NutritionResult.Type
