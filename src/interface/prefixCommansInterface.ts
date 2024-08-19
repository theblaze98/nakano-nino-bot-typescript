import { Client, Message } from 'discord.js'

export interface IPrefixCommands {
	name: string
	alias: string[]
	desc: string
	use: string
	run: (client: Client, message: Message<boolean>, args: string[]) => void
}
