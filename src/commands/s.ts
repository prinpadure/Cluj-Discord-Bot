import { Client, Message } from "discord.js";
import { Run, Help } from "../command-interface";

let run: Run = async (client: Client, message: Message, args: string[]) => {
    const first = args[0];
    const second = args[1];
    if (first && second) {
        let messages = await message.channel.messages.fetch({ limit: 100 });
        const msg = messages.find((m) => {
            return (
                m.content.includes(first) &&
                message.author !== m.author &&
                !m.author.bot
            );
        });
        if (msg) {
            const content =
                "(" +
                message.author.username +
                ") " +
                "<" +
                msg.author.username +
                "> ";
            await message.channel.send(
                content + msg.content.replace(first, second)
            );
        }
    }
};

let help: Help = {
    name: "ping",
    info: "Pong!",
    usage: "",
};

export { help, run };
