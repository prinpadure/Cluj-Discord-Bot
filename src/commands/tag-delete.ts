import { Client, Message } from "discord.js";
import { Run, Help } from "../command-interface";
import { default as Tag } from "../models/tag-model";
import { messages } from "../utils/messageContentUtils";

let run: Run = async (client: Client, message: Message, args: string[]) => {
    let content = "";
    if (!message.member?.hasPermission("ADMINISTRATOR")) {
        content = messages.NotAllowed;
    } else if (!args[0]) {
        content = help.usage;
    } else {
        content = await processDeleteTag(args[0]);
    }
    message.channel.send(content);
};

let processDeleteTag = async (tagIdentifier: string) => {
    let content = "";
    let tag = await Tag.deleteOne({ tag: tagIdentifier });
    content = tag.deletedCount ? messages.Done : messages.NotFound;
    return content;
};

let help: Help = {
    info: "Deletes tag",
    name: "tag-delete",
    usage: "tag-delete <tag>",
};

export { help, run };
