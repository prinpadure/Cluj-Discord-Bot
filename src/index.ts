import { Client } from "discord.js";
const client = new Client();

const { token } = require("../config.json");

client.once("ready", () => {
    console.log("Ready player one!");
});

client.login(token);
