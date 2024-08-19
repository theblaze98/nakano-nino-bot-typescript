import { Collection } from 'discord.js'
import { readdirSync } from 'fs'
import { join } from 'path'
import { SlashCommand } from '@/interface/slashCommandsInterface'
import { IPrefixCommands } from '@/interface'

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

export const prefixCommandsHandler = () => {
  const path = join(__dirname, '..', 'prefixcommands')
  const prefixCommands = new Collection<string, IPrefixCommands>()
  const aliasMap = new Collection<string, string>()
  prefixCommands.clear()
  const dirs = readdirSync(path)

  dirs.forEach(dir => {
    const prefixCommandFiles = readdirSync(join(path, dir)).filter(file => file.endsWith('.js'))
    prefixCommandFiles.forEach(file => {
      const prefixCommand = require(join(path, dir, file))
      prefixCommands.set(prefixCommand.command.name, prefixCommand.command)
      prefixCommand.command.alias.forEach((alias: string) => aliasMap.set(alias, prefixCommand.command.name))
    })
  })
  return {prefixCommands, aliasMap}
}
