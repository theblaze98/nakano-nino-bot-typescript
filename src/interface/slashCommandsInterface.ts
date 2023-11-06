import { Client, CommandInteraction } from 'discord.js'

export interface SlashCommand {
  name: string
  description: string
  options: []
  execute: (client: Client, int: CommandInteraction) => {}
}
