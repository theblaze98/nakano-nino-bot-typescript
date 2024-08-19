import { ChannelType, Client } from 'discord.js'
import { prefixCommandsHandler } from '@/handlers/commandsHandlers'

const prefix = '+'

export const messageCreateEvent = (client: Client) => {
	client.on('messageCreate', async message => {
		if (
			message.author.bot ||
			!message.guild ||
			message.channel.type === ChannelType.DM
		)
			return

		if (!message.content.startsWith(prefix)) return

		let args = message.content.slice(prefix.length).trim().split(/ +/)
		let command = args.shift()?.toLowerCase()

		const { prefixCommands, aliasMap } = prefixCommandsHandler()

		const commandName = prefixCommands.get(<string>command) ? command : aliasMap.get(<string>command)

		commandName ?
			prefixCommands.get(commandName)?.run(client, message, args) :
			message.reply("❌ - No se encontro el comando usa +help para consultar mis comandos")
	})
}
