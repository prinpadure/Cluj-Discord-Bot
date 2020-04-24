import { Client, Message } from "discord.js";
import { Run, Help } from "../command-interface";

const regional_indicator = ":regional_indicator_";

let run: Run = (client: Client, message: Message, args: string[]) => {
    const wholeArg = args.join(" ");
    const username = "(" + message.author.username + ")";
    let content = "";
    for (const c of wholeArg) {
        if (c.toLowerCase() != c.toUpperCase()) {
            content += regional_indicator + c.toLowerCase() + ":";
        } else {
            content += c;
        }
    }
    if (content) {
        content = username + " " + content;
        console.log(content);
        message.channel.send(content);
    }
};

let help: Help = {
    name: "letters",
    info: "Display in regional letters",
    usage: "letters <phrase>",
};

export { help, run };
