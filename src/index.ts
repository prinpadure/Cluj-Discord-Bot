import { Client, Collection, ClientEvents } from "discord.js";
import fs from "fs";
import { UserClient } from "./command-interface";
import { default as initMongoose } from "./utils/mongoose";
import { config } from "dotenv-flow";

config();

const client = new Client() as UserClient;
client.commands = new Collection();

fs.readdir("./src/commands/", async (err, files) => {
    if (err) return console.error(err);
    for (const file of files) {
        let cmdName = file.split(".")[0];
        let module = await import(`./commands/${cmdName}`);
        client.commands.set(cmdName, module);
    }
});

fs.readdir("./src/events/", async (err, files) => {
    if (err) return console.error(err);
    for (const file of files) {
        let evtName = file.split(".")[0];
        import(`./events/${evtName}`).then((evt) => {
            console.log(`Loaded event '${evtName}'`);
            client.on(
                evtName as keyof ClientEvents,
                evt.default.bind(null, client)
            );
        });
    }
});

initMongoose();
client.login();
