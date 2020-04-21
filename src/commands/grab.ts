import { Client, Message } from "discord.js";
import { Run, Help } from "../command-interface";
import { default as Grab } from "../models/grab-model";
import { default as mongoose } from "mongoose";

let run: Run = (client: Client, message: Message, args: string[]) => {
    let user = message.mentions.members?.first();
    const arg = args[0];
    if (user) {
        let grab = new Grab({
            _id: mongoose.Types.ObjectId(),
            userId: user.id,
            userName: user.user.username,
            grabMessage: user.lastMessage?.content,
        });
        grab.save()
            .then((result) => {
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
        message.channel.send("Done.");
        return;
    } else if (!arg) {
        message.channel.send(`${help.usage}`);
        return;
    }
    message.channel.send(`Not found`);
};

let help: Help = {
    info: "Grab user's last message",
    name: "grab",
    usage: "grab <user>",
};

export = { help, run };
