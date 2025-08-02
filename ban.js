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
    if (!interaction.member.permissions.has('BanMembers')) return interaction.reply({ content: '🚫 You lack permission to ban!', ephemeral: true });

    const user = interaction.options.getUser('target');
    const member = interaction.guild.members.cache.get(user.id);
    if (!member) return interaction.reply({ content: '⚠ Member not found.', ephemeral: true });

    await member.ban();
    interaction.reply(`✅ ${user.tag} was banned.`);
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

