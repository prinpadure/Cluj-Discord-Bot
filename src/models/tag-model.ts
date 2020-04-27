import { Schema, model } from "mongoose";

const tagSchema = new Schema({
    _id: Schema.Types.ObjectId,
    userName: String,
    tag: String,
    content: String,
});

export = model("Tag", tagSchema);
