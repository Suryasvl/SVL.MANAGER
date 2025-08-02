const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('roleinfo')
    .setDescription('Get information about a role')
    .addRoleOption(option =>
      option.setName('role').setDescription('The role to get info about').setRequired(true)),

  async execute(interaction) {
    const role = interaction.options.getRole('role');
    const embed = new EmbedBuilder()
      .setTitle(`Role Info: ${role.name}`)
      .addFields(
        { name: 'ID', value: role.id, inline: true },
        { name: 'Color', value: role.hexColor, inline: true },
        { name: 'Mentionable', value: `${role.mentionable}`, inline: true },
        { name: 'Position', value: `${role.position}`, inline: true },
        { name: 'Created At', value: `<t:${Math.floor(role.createdTimestamp / 1000)}:R>`, inline: false }
      )
      .setColor(role.color || 'White');
    await interaction.reply({ embeds: [embed] });
  }
};