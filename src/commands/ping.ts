import { Client, Message } from "discord.js";
import { Run, Help } from "../command-interface";

let run: Run = (client: Client, message: Message, args: string[]) => {
    message.channel.send("pong!");
};

let help: Help = {
    name: "ping",
    info: "Pong!",
    usage: "",
};

export { help, run };
