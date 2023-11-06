import {
	ActivityType,
	Client,
	GatewayIntentBits,
	Partials,
	PresenceUpdateStatus,
  Collection
} from 'discord.js'

export const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
	partials: [
		Partials.GuildMember,
		Partials.User,
		Partials.Message,
		Partials.Channel,
	],
	allowedMentions: {
		repliedUser: false,
		parse: ['users', 'roles'],
	},
	presence: {
		activities: [
			{ name: 'a mi hermoso creador', type: ActivityType.Watching },
			{ name: 'help +help', type: ActivityType.Watching },
		],
		status: PresenceUpdateStatus.Online,
	},
})


