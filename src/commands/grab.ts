import { Client, Message } from "discord.js";
import { connect } from "mongoose";

const { mongoURI } = require("../../config.json");
connect(mongoURI);

let run = (client: Client, message: Message) => {};

export = run;
