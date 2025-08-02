const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription('Unban a user by ID')
    .addStringOption(option =>
      option.setName('userid').setDescription('User ID to unban').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction) {
    const userId = interaction.options.getString('userid');
    try {
      await interaction.guild.members.unban(userId);
      await interaction.reply(`✅ Unbanned <@${userId}>`);
    } catch (err) {
      await interaction.reply('❌ Unable to unban. Make sure the ID is correct.');
    }
  }
};