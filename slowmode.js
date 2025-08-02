const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('slowmode')
    .setDescription('Set slowmode for the channel')
    .addIntegerOption(option =>
      option.setName('seconds')
        .setDescription('Slowmode duration in seconds (0-21600)')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction) {
    const seconds = interaction.options.getInteger('seconds');

    if (seconds < 0 || seconds > 21600) {
      return interaction.reply({ content: '❌ Slowmode must be between 0 and 21600 seconds (6 hours).', ephemeral: true });
    }

    try {
      await interaction.channel.setRateLimitPerUser(seconds);

      if (seconds === 0) {
        await interaction.reply('🕐 Slowmode disabled.');
      } else {
        await interaction.reply(`🕐 Slowmode set to ${seconds} seconds.`);
      }
    } catch (error) {
      console.error('Slowmode error:', error);
      await interaction.reply({ content: '❌ Failed to set slowmode.', ephemeral: true });
    }
  }
};