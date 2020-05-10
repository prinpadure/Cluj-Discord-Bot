import { Client, Message } from "discord.js";
import { Run, Help } from "../command-interface";
import { default as Tag } from "../models/tag-model";
import { messages } from "../utils/messageContentUtils";

let run: Run = async (client: Client, message: Message, args: string[]) => {
    let content = "";
    if (!args[0]) {
        content = help.usage + (await getAllTagsAsString());
    } else {
        content = await getTag(args[0]);
    }
    console.log(content);
    message.channel.send(content);
};

let getTag = async (tagIdentifier: string) => {
    let content = "";
    let tag = (await Tag.findOne({ tag: tagIdentifier })) as any;
    content = tag ? tag.content : messages.NotFound;
    return content;
};

let getAllTags = async () => {
    let tags: string[] = [];
    let allTags = (await Tag.find()) as any[];
    allTags.forEach((tag) => {
        tags.push(tag.tag);
    });
    return tags;
};

let getAllTagsAsString = async () => {
    const codeBlock = messages.codeBlock;
    const separator = codeBlock + ", `";
    let tags = codeBlock + (await getAllTags()).join(separator) + codeBlock;
    return tags;
};

let help: Help = {
    info: "View tag",
    name: "tag",
    usage: "list of tags: ",
};

export = { help, run };
