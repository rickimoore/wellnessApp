import { types } from "mobx-state-tree"

export const UserTokenModel = types
    .model("UserToken").props({
        access_token: types.string,
        expires_in: types.number,
        refresh_token: types.string,
        token_type: types.string,
    });

export const UserModel = types
    .model("User").props({
        created_at: types.string,
        email: types.string,
        email_verified_at: types.maybe(types.boolean),
        id: types.number,
        name: types.string,
        updated_at: types.string,
    });