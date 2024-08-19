import { EmbedBuilder, Client, CommandInteraction } from 'discord.js'
import { SlashCommand } from '@/interface/slashCommandsInterface'

export const command: SlashCommand = {
	name: 'userinfo',
	description: 'Muestra la información de un miembro del server',
	options: [
		{
			name: 'member',
			type: 6,
			description: 'Menciona al miembro del que quieres el avatar',
			require: false,
		},
	],
	async execute(_client: Client, int: CommandInteraction) {
		const user = int.options.getUser('member') || int.user
		const member = int.guild?.members.cache.get(user.id)
		const nickname = member?.nickname || 'No tiene alias'
		const roles =
			member?.roles.cache
				.sort((a, b) => b.position - a.position)
				.map(role => role.toString())
				.slice(0, -1)
				.join(', ') || 'No tiene roles'

		const embed = new EmbedBuilder()
			.setColor('Random')
			.setThumbnail(user.avatarURL())
			.setDescription(
				`**Usuario**: ${user.tag}\n**Alias**: ${nickname}\n**ID**: ${user.id}`
			)
			.addFields(
				{
					name: 'Se unió a Discord',
					value: `\`${new Date(user.createdTimestamp).toLocaleDateString()}\``,
				},
				{
					name: 'Se unió al server',
					value: `\`${new Date(
						member?.joinedTimestamp || 0
					).toLocaleDateString()}\``,
				},
				{
					name: 'Roles',
					value: roles,
				}
			)
			.setFooter({
				text: 'Creado por MAKIGAWA',
				iconURL:
					'https://w0.peakpx.com/wallpaper/209/412/HD-wallpaper-anime-the-quintessential-quintuplets-nino-nakano.jpg',
			})

		await int.reply({ embeds: [embed] })
	},
}
