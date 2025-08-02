const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('servericon')
    .setDescription('Displays the server\'s icon'),

  async execute(interaction) {
    const icon = interaction.guild.iconURL({ dynamic: true, size: 512 });
    await interaction.reply(icon || 'No server icon found!');
  }
};