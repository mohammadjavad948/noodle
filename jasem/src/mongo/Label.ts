import {Document, model, Schema} from "mongoose";

export interface LabelI extends Document{
    name: string
    color: string
}

const schema = new Schema({
    name: String,
    color: String
});


export const Label = model<LabelI>('label', schema);
