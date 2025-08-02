module.exports = {
  name: 'ban',
  description: 'Ban a member from the server.',
  async execute(message, args) {
    if (!message.member.permissions.has('BanMembers')) return message.reply('🚫 You lack permission to ban!');
    const member = message.mentions.members.first();
    if (!member) return message.reply('⚠ Mention a user to ban.');
    await member.ban();
    message.channel.send(`✅ ${member.user.tag} was banned.`);
  },

  async executeSlash(interaction) {
    if (!interaction.member.permissions.has('BanMembers')) {
      return interaction.reply({ content: '🚫 You lack permission to ban!', ephemeral: true });
    }

    const user = interaction.options.getUser('target');
    if (!user) {
      return interaction.reply({ content: '⚠ Please specify a user to ban.', ephemeral: true });
    }

    try {
      const member = await interaction.guild.members.fetch(user.id).catch(() => null);
      if (!member) {
        return interaction.reply({ content: '⚠ Member not found in this server.', ephemeral: true });
      }

      if (!member.bannable) {
        return interaction.reply({ content: '❌ I cannot ban this member.', ephemeral: true });
      }

      await member.ban({ reason: `Banned by ${interaction.user.tag}` });
      await interaction.reply({ content: `✅ ${user.tag} was banned.` });
    } catch (error) {
      console.error('Ban error:', error);
      await interaction.reply({ content: '❌ Failed to ban the member.', ephemeral: true });
    }
  },

  options: [
    {
      name: 'target',
      description: 'User to ban',
      type: 6, // USER
      required: true
    }
  ]
};

