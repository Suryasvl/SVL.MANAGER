
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Timeout a member')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('User to timeout')
        .setRequired(true))
    .addIntegerOption(option =>
      option.setName('duration')
        .setDescription('Duration in minutes')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Reason for timeout')
        .setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const duration = interaction.options.getInteger('duration');
    const reason = interaction.options.getString('reason') || 'No reason provided';

    if (!interaction.member.permissions.has('ModerateMembers')) {
      return interaction.reply({ content: '❌ You lack permission to timeout members!', ephemeral: true });
    }

    try {
      const member = await interaction.guild.members.fetch(user.id);
      if (!member) {
        return interaction.reply({ content: '❌ Member not found in this server.', ephemeral: true });
      }

      const timeoutDuration = duration * 60 * 1000; // Convert minutes to milliseconds
      await member.timeout(timeoutDuration, reason);
      
      await interaction.reply({ content: `✅ ${user.tag} has been timed out for ${duration} minutes.\nReason: ${reason}` });
    } catch (error) {
      console.error('Timeout error:', error);
      await interaction.reply({ content: '❌ Failed to timeout the member.', ephemeral: true });
    }
  }
};
