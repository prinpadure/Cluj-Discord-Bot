import { Client, Message } from "discord.js";
import { Run, Help } from "../command-interface";
import { messages } from "../utils/messageContentUtils";

let run: Run = async (client: Client, message: Message, args: string[]) => {
    const first = args[0];
    const second = args[1];
    let content = messages.NotFound;

    if (first && second) {
        let messages = await message.channel.messages.fetch({ limit: 100 });
        const msg = messages.find((m) => {
            return m.content.includes(first) && !m.content.includes(".s") && !m.author.bot;
        });
        if (msg) {
            content =
                "(" +
                message.author.username +
                ") " +
                "<" +
                msg.author.username +
                "> " +
                msg.content.replace(new RegExp(first, "g"), () => second);
        }
    }
    console.debug(content);
    await message.channel.send(content);
};

let help: Help = {
    name: "ping",
    info: "Pong!",
    usage: "",
};

export { help, run };
