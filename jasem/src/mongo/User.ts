import {Document, model, Schema, Types} from "mongoose";
import {Label, LabelI} from "./Label";

interface UserI extends Document{
    name: string
    username: string
    password: string
    label: LabelI[] | string
}

const schema = new Schema({
    name: String,
    username: String,
    password: String,
    label: {
        type: Types.ObjectId,
        ref: Label
    },
});


export const User = model<UserI>('user',schema);
