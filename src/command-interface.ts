import { Client, Message, Collection } from "discord.js";

export { UserClient, Run, Help };

type UserClient = Client & { commands: Collection<string, Command> };

type Run = (client: Client, message: Message, args: string[]) => any;

type Help = { name: string; info: string; usage: string };

interface Command {
    run: Run;
    help: Help;
}
