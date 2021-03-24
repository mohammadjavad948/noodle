import {Document, model, Schema} from "mongoose";

export interface TimeI extends Document{
    time: number
}

const schema = new Schema({
    time: Number
});


export const Time = model<TimeI>('time', schema);
