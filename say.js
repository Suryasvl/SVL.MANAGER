const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Say a message as the bot')
    .addStringOption(option =>
      option.setName('text').setDescription('Message to send').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const msg = interaction.options.getString('text');
    await interaction.reply({ content: '✅ Sent!', ephemeral: true });
    await interaction.channel.send(msg);
  }
};