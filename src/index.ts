import { Client, Collection, ClientEvents } from "discord.js";
import fs from "fs";
import { UserClient } from "./command-interface";

const client = new Client() as UserClient;
client.commands = new Collection();
const { prefix, token } = require("../config.json");

client.once("ready", () => {
    console.log("Ready player one!");
});

client.on("message", (message) => {
    if (message.content[0] !== prefix || message.author.bot) return;

    let args: string[] = message.content.slice(prefix.length).trim().split(" ");
    let command = args.shift()!.toLowerCase();
    const cmd = client.commands.get(command);
    if (!cmd) return;

    try {
        cmd.run(client, message, args);
    } catch (error) {
        console.error(error);
    }
});

fs.readdir("./src/commands/", async (err, files) => {
    if (err) return console.error(err);
    files.forEach((file) => {
        if (!file.endsWith("ts") || file === "command.ts") return;
        let cmdName = file.split(".")[0];
        import(`./commands/${cmdName}`).then((props) => {
            console.log(`Loaded command '${cmdName}'`);
            client.commands.set(cmdName, props);
        });
    });
});

fs.readdir("./src/events/", async (err, files) => {
    if (err) return console.error(err);
    files.forEach((file) => {
        if (!file.endsWith("ts")) return;
        let evtName = file.split(".")[0];
        import(`./commands/${evtName}`).then((evt) => {
            console.log(`Loaded event '${evtName}'`);
            client.on(evtName as keyof ClientEvents, evt.bind(null, client));
        });
    });
});

client.login(token);
