import { EmbedBuilder, ButtonBuilder, ActionRowBuilder } from 'discord.js'
import { IPrefixCommands } from '@/interface'

export const command: IPrefixCommands = {
	name: 'avatar',
	alias: ['avt'],
	desc: 'Muestra el avatar de un usuario o del autor del mensaje',
	use: '+avatar [usuario]',
	async run(_client, message, args) {
		const user = message.mentions.users.first() || message.author

		const button = new ButtonBuilder()
			.setLabel('Ver en el navegador')
			.setURL(
				user.displayAvatarURL({
					size: 4096,
					extension: 'png',
				})
			)
			.setStyle(5)
			.setEmoji('🌐')

		const row = new ActionRowBuilder().addComponents(button)

		const embed = new EmbedBuilder()
			.setColor('Random')
			.setDescription(`Este es el avatar de ${user.username}\n`)
			.setImage(user.displayAvatarURL({ size: 1024, extension: 'png' }))
			.setFooter({
				text: 'Creado por MAKIGAWA',
				iconURL:
					'https://w0.peakpx.com/wallpaper/209/412/HD-wallpaper-anime-the-quintessential-quintuplets-nino-nakano.jpg',
			})
		await message.reply({ embeds: [embed], components: [row] })
	},
}
