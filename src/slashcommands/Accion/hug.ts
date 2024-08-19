import { EmbedBuilder } from 'discord.js'
import { SlashCommand } from '@/interface/slashCommandsInterface'

export const command: SlashCommand = {
	name: 'hug',
	description: 'Abrazas a alguien',
	options: [
		{
			name: 'member',
			type: 6,
			description: 'Menciona al miembro al que quieres abrazar',
			require: true,
		},
	],
	async execute(_client, int) {
		const user = int.options.getUser('member')

		if (user) {
			const gifResponse = await fetch('https://api.waifu.pics/sfw/hug')
			const gifData = await gifResponse.json()
			const gif = gifData.url

			const embed = new EmbedBuilder()
				.setColor('Random')
				.setDescription(
					user !== int.user
						? `${int.user.username} le dio un abrazo a ${user.username}`
						: `${int.user.username} le dio un abrazo a un ser imaginario`
				)
				.setImage(gif)
			await int.reply({ embeds: [embed] })
		} else {
			int.reply(`❌ - Debes mencionar a alguien`)
		}
	},
}
