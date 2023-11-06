import { Collection } from 'discord.js'
import { readdirSync } from 'fs'
import { join } from 'path'
import { SlashCommand } from '@/interface/slashCommandsInterface'

export const slashCommandsHandler = () => {
  const path = join(__dirname, '..', 'slashcommands')
  const slashCommands = new Collection<string, SlashCommand>()
  slashCommands.clear()
  const dirs = readdirSync(path)

  dirs.forEach(dir => {
    const slashCommandFiles = readdirSync(join(path, dir)).filter(file => file.endsWith('.js'))
    slashCommandFiles.forEach(file => {
      const slashCommand = require(join(path, dir, file))
      slashCommands.set(slashCommand.command.name, slashCommand.command)
    })
  })

  return slashCommands
}
