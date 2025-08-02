const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Get info about a user')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('User to get info on')
        .setRequired(false)),
  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;
    const member = await interaction.guild.members.fetch(user.id);

    const embed = {
      color: 0x00AE86,
      title: `${user.tag}'s Info`,
      fields: [
        { name: 'ID', value: user.id },
        { name: 'Joined Server', value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>` },
        { name: 'Account Created', value: `<t:${Math.floor(user.createdTimestamp / 1000)}:R>` },
      ],
      thumbnail: { url: user.displayAvatarURL() },
    };
    await interaction.reply({ embeds: [embed] });
  },
};