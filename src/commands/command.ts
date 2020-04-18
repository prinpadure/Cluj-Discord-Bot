import { Message } from "discord.js";

const { prefix } = require("../../config.json");

type runCommand = (message: Message) => any;

export function processMessage(message: Message): void {
    if (message.content[0] != ".") return;
    let args: string[] = message.content.substr(prefix.length).split(" ");
    let command: string = args[0];
    let commandFunc: runCommand = (message: Message): any => {};

    switch (command) {
        case "ping":
            commandFunc = ping;
            break;
        case "grab":
            commandFunc = grab;
            break;
        case "help":
            commandFunc = help;
            break;
    }
    commandFunc(message);
}

const help = (message: Message): void => {
    message.channel.send("List of commands: ");
};

const ping = (message: Message): void => {
    message.reply("pong!");
};

const grab = (message: Message): any => {
    message.reply("Here is your Grab!");
};
