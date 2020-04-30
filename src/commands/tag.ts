import { Client, Message } from "discord.js";
import { Run, Help } from "../command-interface";
import { default as Tag } from "../models/tag-model";

let run: Run = async (client: Client, message: Message, args: string[]) => {
    let content = "";
    if (!args[0]) {
        content = help.usage;
        content += "```" + (await getAllTags()).join("```, ```");
    } else {
        content = await getTag(args[0]);
    }
    message.channel.send(content);
};

let getTag = async (tagIdentifier: string) => {
    let content = "";
    let tag = (await Tag.findOne({ tag: tagIdentifier })) as any;
    content = tagIdentifier ? tag.tag : "Not Found.";
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

let help: Help = {
    info: "View tag",
    name: "tag",
    usage: "tag <tag>; tags: ",
};

export = { help, run };
