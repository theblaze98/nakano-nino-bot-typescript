import { Client } from 'discord.js'

export const presenceUpdateEvent = (client: Client) => {
  const GUILD_ID = '1094383528566861918';
  const ROLE_ID = '1387068457241149561';
  const KEYWORD = 'gg/land';

  client.on('presenceUpdate', async (oldPresence, newPresence) => {
    if (!newPresence || !newPresence.member || newPresence.user?.bot) return;
  
    const activities = newPresence.activities;
    const customStatus = activities.find(a => a.type === 4); // type 4 = CUSTOM
  
    if (customStatus && customStatus.state?.includes(KEYWORD)) {
      try {
        const guild = client.guilds.cache.get(GUILD_ID);
        if (!guild) return;
  
        const member = await guild.members.fetch(newPresence.userId);
        if (!member.roles.cache.has(ROLE_ID)) {
          await member.roles.add(ROLE_ID);
          console.log(`Rol asignado a ${member.user.tag}`);
        }
      } catch (error) {
        console.error('Error al asignar el rol:', error);
      }
    }
  });
}
