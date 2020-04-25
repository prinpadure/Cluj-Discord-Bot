import { Client, Message } from "discord.js";
import { Run, Help } from "../command-interface";

let run: Run = async (client: Client, message: Message, args: string[]) => {
    const first = args[0];
    const second = args[1];
    if (first && second) {
        let messages = await message.channel.messages.fetch({ limit: 50 });
        const msg = messages.find((m) => {
            return m.content.includes(first) && message != m;
        });
        if (msg) {
            const username = "(" + message.author.username + ") ";
            message.channel.send(username + msg.content.replace(first, second));
        }
    }
};

let help: Help = {
    name: "ping",
    info: "Pong!",
    usage: "",
};

export { help, run };
