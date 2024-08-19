import { EmbedBuilder, ChannelType } from 'discord.js'
import { IPrefixCommands } from '@/interface'

const SFW_URL = 'https://api.waifu.pics/sfw/waifu'
const NSFW_URL = 'https://api.waifu.pics/nsfw/waifu'

export const command: IPrefixCommands = {
	name: 'waifu',
	alias: ['wa'],
	desc: 'Muestra una imagen de una waifu al azar',
	use: '+waifu',
	async run(_client, message, args) {
		const isNSFW = args.includes('nsfw')
		const url = isNSFW ? NSFW_URL : SFW_URL

		if (
			isNSFW &&
			message.channel.type === ChannelType.GuildText &&
			!message.channel.nsfw
		) {
			return await message.reply('❌ - El canal no es NSFW')
		}

		try {
			const res = await fetch(url)
			const data = await res.json()
			const gif = data.url

			const embed = new EmbedBuilder()
				.setColor('Random')
				.setDescription(`waifu${isNSFW ? ' - nsfw' : ''}`)
				.setImage(gif)

			return await message.reply({ embeds: [embed] })
		} catch (error) {
			return await message.reply('❌ - Ha habido un error al cargar la imagen')
		}
	},
}
