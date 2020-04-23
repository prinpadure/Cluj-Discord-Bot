import { Client, Message } from "discord.js";
import { UserClient } from "../command-interface";

const prefix = process.env.PREFIX;

let message = async (client: Client, message: Message) => {
    if (message.content[0] !== prefix || message.author.bot) return;

    let args: string[] = message.content.slice(prefix.length).trim().split(" ");
    let command = args.shift()!.toLowerCase();
    const cmd = (client as UserClient).commands.get(command);
    if (!cmd) return;

    try {
        await cmd.run(client, message, args);
    } catch (error) {
        console.error(error);
    }
};

export = message;
