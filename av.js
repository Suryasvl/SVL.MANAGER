const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Shows avatar of a user')
    .addUserOption(option =>
      option.setName('user').setDescription('Select a user').setRequired(false)),

  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;
    await interaction.reply({ content: user.displayAvatarURL({ size: 512, dynamic: true }) });
  }
};