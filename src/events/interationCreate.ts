import { Client } from "discord.js";
import { slashCommandsHandler } from "@/handlers/commandsHandlers";

export const interactionCreateEnvent = (client: Client) => {
  client.on('interactionCreate', iteraction => {
    if (!iteraction.isChatInputCommand()) return
    slashCommandsHandler().get(iteraction.commandName)?.execute(client, iteraction)
  })
}
