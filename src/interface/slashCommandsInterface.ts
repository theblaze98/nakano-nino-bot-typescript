import { Client, CommandInteraction } from 'discord.js'

export interface SlashCommand {
	name: string
	description: string
	options: [
		{
			name: string
			type: number
			description: string
			require: boolean
		}
	] | []
	execute: (client: Client, int: CommandInteraction) => {}
}
