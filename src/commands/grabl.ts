import * as command from "../command-interface";
import { Client, Message, User } from "discord.js";
import { default as Grab } from "../models/grab-model";

const codeBlock = "```";

let run: command.Run = async (
    client: Client,
    message: Message,
    args: string[]
) => {
    const user = message.mentions.members?.first();

    const watch = user
        ? user.nickname
            ? user.nickname
            : user.user.username
        : "Server";
    let codeBlockGrabs = watch + " grabs:\n";

    let grabs = await getGrabs(user?.user);
    codeBlockGrabs += codeBlock;
    for (const grab of grabs as any) {
        codeBlockGrabs +=
            "<" + grab.userName + ">" + " " + grab.grabMessage + "\n";
    }
    codeBlockGrabs += codeBlock;
    grabs.length > 0
        ? await message.channel.send(codeBlockGrabs)
        : await message.channel.send("Not Found.");
};

let getGrabs = async (user?: User) => {
    let grabs = await Grab.find(user ? { userId: user.id } : {})
        .sort({ _id: -1 })
        .limit(10);
    return grabs;
};

let help: command.Help = {
    info: "Grab list",
    name: "grabl",
    usage: "grabl",
};

export = { help, run };
