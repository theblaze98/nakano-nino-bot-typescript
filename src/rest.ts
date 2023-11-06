import { REST, Routes } from 'discord.js'
import { slashCommandsHandler } from './handlers/commandsHandlers'

export const rest = new REST({ version: '10' }).setToken(
	<string>process.env.TOKEN
)

const body = slashCommandsHandler().map(command => {
	return { name: command.name, description: command.description }
})

export const loadApplicationsCommands = async () => {
	try {
		console.log('Cargando Application Commands {REST}')
		await rest.put(Routes.applicationCommands(<string>process.env.BOT_ID), {
			body,
		})
		console.log('Application Commands Cargadas {REST}')
	} catch (error) {
		console.log(error)
	}
}
