import {Document, model, Schema, Types} from "mongoose";
import {Time, TimeI} from "./Time";

export interface LabelI extends Document{
    name: string
    color: string
    time: TimeI[] | string[]
}

const schema = new Schema({
    name: String,
    color: String,
    time: [{
        type: Types.ObjectId,
        ref: Time
    }]
});


export const Label = model<LabelI>('label', schema);
