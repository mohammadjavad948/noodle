import {Document, model, Schema} from "mongoose";

interface UserI extends Document{
    name: string
    username: string
    password: string
    label: {
      name: string
      time: number
      color: string
    }[]
}

const schema = new Schema({
    name: String,
    username: String,
    password: String,
    label:[{
       name: String,
       time: Number,
       color: String
    }],
});


export const User = model<UserI>('user',schema);
