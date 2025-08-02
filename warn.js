const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Warns a member')
    .addUserOption(option =>
      option.setName('user').setDescription('User to warn').setRequired(true))
    .addStringOption(option =>
      option.setName('reason').setDescription('Reason for warning').setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'No reason provided';
    const embed = new EmbedBuilder()
      .setColor('Orange')
      .setTitle('User Warned')
      .addFields(
        { name: 'User', value: `${user.tag}`, inline: true },
        { name: 'Reason', value: reason, inline: true },
        { name: 'Moderator', value: `${interaction.user.tag}`, inline: true },
      );

    await interaction.reply({ embeds: [embed] });
  }
};