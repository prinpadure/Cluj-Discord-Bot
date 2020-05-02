import { Client, Message } from "discord.js";
import { Run, Help } from "../command-interface";
import { default as Grab } from "../models/grab-model";
import { default as mongoose } from "mongoose";
import { isCodeBlock, messages } from "../utils/messageContentUtils";

let run: Run = async (client: Client, message: Message, args: string[]) => {
    if (!args[0]) {
        message.channel.send(help.usage);
    } else {
        await processGrab(client, message, args);
    }
};

let processGrab = async (client: Client, message: Message, args: string[]) => {
    const user = message.mentions.members?.first();
    let messageToGrab: Message | undefined;
    let messageToSend = messages.NotFound;

    if (user && user.lastMessage) {
        messageToGrab = user.lastMessage;
    } else if (message.content.includes("https://discordapp.com/channels/")) {
        let messageId = message.content.slice(
            message.content.lastIndexOf("/") + 1
        );
        messageToGrab = await message.channel.messages.fetch(messageId);
    }

    if (messageToGrab) {
        if (messageToGrab.author.id === message.author.id) {
            messageToSend = "You can't grab yourself.";
        } else if (isCodeBlock(messageToGrab.content)) {
            messageToSend = "Can't grab code blocks.";
        } else {
            grabUserMessage(message, messageToGrab);
            messageToSend = messages.Done;
        }
    }
    await message.channel.send(messageToSend);
};

let grabUserMessage = async (message: Message, grabMessage: Message) => {
    let grab = new Grab({
        _id: mongoose.Types.ObjectId(),
        userId: grabMessage.author.id,
        userName: grabMessage.author.username,
        grabMessage: grabMessage,
    });
    let saved = await grab.save();
    console.log(saved);
};

let help: Help = {
    info: "Grab user's last message",
    name: "grab",
    usage: "grab <user>",
};

export = { help, run };
