import {Document, model, Schema} from "mongoose";

export interface TimeI extends Document{
    time: number
    date: string
}

const schema = new Schema({
    time: Number,
    date: {
        type: Date,
        default: new Date().toLocaleDateString()
    }
});


export const Time = model<TimeI>('time', schema);
