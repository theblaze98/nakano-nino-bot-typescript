import { client } from './client'
import { loadApplicationsCommands } from './rest'
import { slashCommandsHandler } from './handlers/commandsHandlers'
import { interactionCreateEnvent } from './events/interationCreate'

client.on('ready', () => {
  console.log(`Logged in as ${client.user?.tag}!`)
  client.application?.commands.set(slashCommandsHandler().map(x => x))
})

loadApplicationsCommands()
interactionCreateEnvent(client)

client.login(process.env.TOKEN)
