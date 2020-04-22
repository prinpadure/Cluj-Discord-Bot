import { Client, Message } from "discord.js";
import { Run, Help } from "../command-interface";
import { default as Grab } from "../models/grab-model";
import { default as mongoose } from "mongoose";

let run: Run = (client: Client, message: Message, args: string[]) => {
    let user = message.mentions.members?.first();
    const arg = args[0];
    if (user?.user.bot) return;
    if (user) {
        let content = user.lastMessage?.content.substring(0, 3);
        if (content === "```") message.channel.send("Can't grab code blocks.");
        let grab = new Grab({
            _id: mongoose.Types.ObjectId(),
            userId: user.id,
            userName: user.user.username,
            grabMessage: user.lastMessage?.content,
        });
        grab.save()
            .then((result) => {
                message.channel.send("Done.");
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
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
