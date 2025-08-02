const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('Get information about this server'),
  async execute(interaction) {
    const { guild } = interaction;

    const embed = {
      color: 0x0099ff,
      title: `${guild.name} Info`,
      fields: [
        { name: 'Owner', value: `<@${guild.ownerId}>` },
        { name: 'Members', value: `${guild.memberCount}` },
        { name: 'Created On', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:D>` },
      ],
      thumbnail: { url: guild.iconURL() },
    };
    await interaction.reply({ embeds: [embed] });
  },
};