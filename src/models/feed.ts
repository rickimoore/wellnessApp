import { types } from "mobx-state-tree"
import {Post} from "./post";

export const Feed = types
    .model("Post").props({
        trending: types.array(Post),
        top_rated: types.array(Post),
        recent: types.array(Post),
    });