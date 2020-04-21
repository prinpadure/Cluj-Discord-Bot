import { Schema, model } from "mongoose";

const grabSchema = new Schema({
    _id: Schema.Types.ObjectId,
    userId: String,
    userName: String,
    grabMessage: String,
});

export = model("Grab", grabSchema);
