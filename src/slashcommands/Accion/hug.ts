import { EmbedBuilder, Client, CommandInteraction} from 'discord.js'
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
	async execute(_client: Client, int: CommandInteraction) {
		const user = int.options.getUser('member')

		if (user != int.user) {
			let gif = await fetch('https://api.waifu.pics/sfw/hug')
				.then(r => r.json())
				.then(data => data.url)

			const embed = new EmbedBuilder()
				.setColor('Random')
				.setDescription(
					`${int.user.username} le dio un abrazo a ${user?.username}`
				)
				.setImage(gif)
			await int.reply({ embeds: [embed] })
		} else if (user === int.user) {
			let gif = await fetch('https://api.waifu.pics/sfw/hug')
				.then(r => r.json())
				.then(data => data.url)

			const embed = new EmbedBuilder()
				.setColor('Random')
				.setDescription(
					`${int.user.username} le dio un abrazo a un ser imaginario`
				)
				.setImage(gif)
			await int.reply({ embeds: [embed] })
		} else {
			int.reply(`❌ - Debes mencionar a alguien`)
		}
	},
}
