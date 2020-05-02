import { Client, Message } from "discord.js";
import { Run, Help } from "../command-interface";
import { default as mongoose } from "mongoose";
import { default as Tag } from "../models/tag-model";
import { messages } from "../utils/messageContentUtils";

let run: Run = async (client: Client, message: Message, args: string[]) => {
    let content = "";
    if (!args[0] || !args[1]) {
        content = help.usage;
    } else {
        await processAddTag(client, message, args);
        content = messages.Done;
    }
    message.channel.send(content);
};

let processAddTag = async (
    client: Client,
    message: Message,
    args: string[]
) => {
    const identifier = args[0];
    const content = args[1];
    let tag = new Tag({
        _id: mongoose.Types.ObjectId(),
        userName: message.author.username,
        tag: identifier,
        content: content,
    });
    let saved = await tag.save();
    console.log(saved);
};

let help: Help = {
    info: "Add a tag",
    name: "tag-add",
    usage: "tag-add <tag> <content>",
};

export = { help, run };
