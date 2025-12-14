import { model, Schema } from "mongoose";
import type { UserModalType } from "../serverTypes.js";

const userSchema = new Schema<UserModalType>({
    companyName: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

export const UserModel = model<UserModalType>("User", userSchema)