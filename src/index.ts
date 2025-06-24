import { client } from './client'
import { loadApplicationsCommands } from './rest'
import { slashCommandsHandler } from './handlers/commandsHandlers'
import { interactionCreateEnvent } from './events/interationCreate'
import { messageCreateEvent } from './events/messageCreate'
import { presenceUpdateEvent } from './events/presenceUpdate'

client.on('ready', () => {
  console.log(`Logged in as ${client.user?.tag}!`)
  client.application?.commands.set(slashCommandsHandler().map(x => x))
})

loadApplicationsCommands()
messageCreateEvent(client)
interactionCreateEnvent(client)
presenceUpdateEvent(client)

client.login(process.env.TOKEN)
