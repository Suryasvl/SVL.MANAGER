const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('embed')
    .setDescription('Send a custom embed')
    .addStringOption(option =>
      option.setName('title').setDescription('Embed title').setRequired(true))
    .addStringOption(option =>
      option.setName('description').setDescription('Embed description').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const title = interaction.options.getString('title');
    const description = interaction.options.getString('description');
    const embed = new EmbedBuilder()
      .setTitle(title)
      .setDescription(description)
      .setColor('Random')
      .setFooter({ text: `Requested by ${interaction.user.tag}` });

    await interaction.reply({ embeds: [embed] });
  }
};