const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Clear messages in this channel')
    .addIntegerOption(option =>
      option.setName('amount').setDescription('Number of messages to delete').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const amount = interaction.options.getInteger('amount');
    if (amount < 1 || amount > 100) {
      return interaction.reply({ content: 'Please enter a number between 1 and 100.', ephemeral: true });
    }

    await interaction.channel.bulkDelete(amount, true);
    await interaction.reply({ content: `🧹 Cleared \`${amount}\` messages.`, ephemeral: true });
  }
};