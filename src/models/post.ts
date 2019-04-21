import { types } from "mobx-state-tree"

export const Post = types
    .model("Post").props({
        id: types.identifier(types.number),
        user_id: types.maybe(types.number),
        background_image: types.string,
        post_name: types.string,
        likes: types.number,
        prep_time: types.number,
        type: types.string,
        rating: types.maybe(types.string),
        description: types.string,
        instructions: types.string,
        created_at: types.string,
        updated_at: types.string,
    });