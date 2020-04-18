import { Client, Message } from "discord.js";

function run(client: Client, message: Message, args: string[]) {
    message.channel.send("pong!");
}

let help = {
    name: "ping",
};

export { help, run };
