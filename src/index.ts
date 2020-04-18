import { Client, Message } from "discord.js";
import Enmap from "enmap";
import fs from "fs";

const client = new Client();

type commandRun = (client: Client, message: Message, args: string[]) => any;
let commands = new Enmap<string, { run: commandRun }>();

const { prefix, token } = require("../config.json");

client.once("ready", () => {
    console.log("Ready player one!");
});

client.on("message", (message) => {
    if (message.content[0] !== prefix || message.author.bot) return;

    let args: string[] = message.content.slice(prefix.length).trim().split(" ");
    let command = args.shift()!.toLowerCase();
    const cmd = commands.get(command);
    if (!cmd) return;

    cmd.run(client, message, args);
});

fs.readdir("./src/commands/", async (err, files) => {
    if (err) return console.error(err);
    files.forEach((file) => {
        if (!file.endsWith("ts") || file === "command.ts") return;
        let cmdName = file.split(".")[0];
        import(`./commands/${cmdName}`).then((props) => {
            console.log(`Loaded command '${cmdName}'`);
            commands.set(cmdName, props);
        });
    });
});

client.login(token);
