import {
	EmbedBuilder,
	ActionRowBuilder,
	StringSelectMenuBuilder,
	StringSelectMenuInteraction,
	ComponentType,
	Interaction,
} from 'discord.js'
import { readdirSync } from 'fs'
import { resolve } from 'path'
import { IPrefixCommands } from '@/interface'
import { prefixCommandsHandler } from '@/handlers/commandsHandlers'

export const command: IPrefixCommands = {
	name: 'help',
	alias: ['h'],
	desc: 'Muestra el menú de ayuda del bot',
	use: '+help [nombre de la categoría o comando]',
	async run(_client, message, args) {
		const categorias = readdirSync(resolve(__dirname, '..'))
		const embed = new EmbedBuilder()
			.setColor('Random')
			.setDescription(
				`Estas son las categorías de mis comandos
				\n>>> ${categorias.map(categoria => `\`${categoria}\``).join(' - ')}
				\nUsa \`+help nombre_categoria\` para ver los comandos de cada categoría`
			)
			.setFooter({
				text: '<obligatorio>[opcional]',
				iconURL:
					'https://w0.peakpx.com/wallpaper/209/412/HD-wallpaper-anime-the-quintessential-quintuplets-nino-nakano.jpg',
			})

		if (args[0]) {
			console.log(args[0])
			const { prefixCommands } = prefixCommandsHandler()
			const command =
				prefixCommands.get(args[0].toLowerCase()) ||
				prefixCommands.find(
					c => c.alias && c.alias.includes(args[0].toLowerCase())
				)
			const categoria = categorias.find(categoria =>
				categoria.toLowerCase().endsWith(args[0].toLowerCase())
			)
			if (command) {
				console.log(command)
				embed
					.setTitle(`Comando ${command.name}`)
					.setDescription(' ')
					.addFields(
						{
							name: 'Descripción',
							value: `\`\`\`${command.desc}\`\`\``,
						},
						{ name: 'Uso', value: `\`${command.use}\`` }
					)
				if (command.alias && command.alias.length >= 1) {
					embed.addFields({
						name: 'Alias',
						value: `${command.alias.map(alias => `\`${alias}\``).join(', ')}`,
					})
				}
			} else if (categoria) {
				const commandsCategoria = readdirSync(
					resolve(__dirname, '..', categoria)
				).filter(file => file.endsWith('.js'))
				embed.setTitle(`Categoría ${categoria}`)
				if (commandsCategoria.length >= 1) {
					embed.setDescription(
						`>>> ${commandsCategoria
							.map(comando => `\`${comando.replaceAll('.js', '')}\``)
							.join(' - ')}
						\nUsa \`+help nombre_comando\` para obtener más información sobre el comando`
					)
				}
			} else {
				embed.setDescription(
					`❌**No se ha encontrado el comando o categoría especificado**❌ \nUsa \`+help\` para ver los comandos y categorías`
				)
			}
		}
		const selectMenu = new StringSelectMenuBuilder()
			.setCustomId('select-category')
			.setPlaceholder('Selecciona una categoría')
			.addOptions(
				categorias.map(categoria => ({
					label: categoria,
					value: categoria,
				}))
			)

		const row = new ActionRowBuilder().addComponents(selectMenu)

		await message.reply({ embeds: [embed], components: [row] })

		const filter = (i: Interaction) =>
			i.isStringSelectMenu() &&
			i.customId === 'select-category' &&
			i.user.id === message.author.id

		const collector = message.channel.createMessageComponentCollector({
			filter,
			componentType: ComponentType.StringSelect,
			time: 60000,
		})

		collector.on('collect', async (i: StringSelectMenuInteraction) => {
			const selectedCategory = i.values[0]
			const commandsCategoria = readdirSync(
				resolve(__dirname, '..', selectedCategory)
			).filter(file => file.endsWith('.js'))
			const categoryEmbed = new EmbedBuilder()
				.setTitle(`Categoría ${selectedCategory}`)
				.setDescription(
					`>>> ${commandsCategoria
						.map(comando => `\`${comando.replaceAll('.js', '')}\``)
						.join(' - ')}
						\nUsa \`+help nombre_comando\` para obtener más información sobre el comando`
				)
				.setColor('Random')

			await i.update({ embeds: [categoryEmbed], components: [row] })
		})
	},
}
