import { Client } from "discord.js";
import { processMessage } from "./commands/command";

const client = new Client();

const { prefix, token } = require("../config.json");

client.once("ready", () => {
    console.log("Ready player one!");
});

client.on("message", (message) => {
    processMessage(message);
});

client.login(token);
