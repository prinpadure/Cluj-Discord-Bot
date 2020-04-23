import * as command from "../command-interface";
import { Client, Message } from "discord.js";
import { default as Grab } from "../models/grab-model";

let run: command.Run = async (
    client: Client,
    message: Message,
    args: string[]
) => {
    let user = message.mentions.members?.first();

    let grabs = Grab.find(user ? { userId: user.user.id } : {})
        .sort({ _id: -1 })
        .limit(10);

    grabs.exec((err, grabs) => {
        if (err) console.error(err);
        let allGrabs = "Server grabs:\n```";
        for (const grab of grabs as any) {
            allGrabs +=
                "<" + grab.userName + ">" + " " + grab.grabMessage + "\n";
        }
        allGrabs += "```";
        console.log(grabs.length);
        grabs.length > 0
            ? message.channel.send(allGrabs)
            : message.channel.send("Not Found.");
    });
};

let help: command.Help = {
    info: "Grab list",
    name: "grabl",
    usage: "grabl",
};

export = { help, run };
