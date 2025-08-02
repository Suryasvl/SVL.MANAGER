const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('nick')
    .setDescription('Change nickname of a user')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('User to nickname')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('nickname')
        .setDescription('New nickname')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames),
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const nickname = interaction.options.getString('nickname');
    const member = await interaction.guild.members.fetch(user.id);

    await member.setNickname(nickname);
    await interaction.reply(`Changed nickname of ${user.tag} to **${nickname}**`);
  },
};