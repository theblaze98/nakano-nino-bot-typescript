import { EmbedBuilder } from 'discord.js'
import { IPrefixCommands } from '@/interface'

export const command: IPrefixCommands = {
	name: 'hug',
	alias: ['abrazo'],
	desc: 'Abrazas a un miembro del server',
	use: '+hug <miembro>',
	async run(_client, message, _args) {
		const user = message.mentions.users.first()

		if (user) {
			const gifResponse = await fetch('https://api.waifu.pics/sfw/hug')
			const gifData = await gifResponse.json()
			const gif = gifData.url

			const embed = new EmbedBuilder()
				.setColor('Random')
				.setDescription(
					user !== message.author
						? `${message.author.displayName} le dio un abrazo a ${user.displayName}`
						: `${message.author.username} le dio un abrazo a un ser imaginario`
				)
				.setImage(gif)
			await message.reply({ embeds: [embed] })
		} else {
			message.channel.send(`❌ - Debes mencionar a alguien`)
		}
	},
}
