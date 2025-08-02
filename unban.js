
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
    
    if (!interaction.member.permissions.has('BanMembers')) {
      return interaction.reply({ content: '❌ You lack permission to unban members!', ephemeral: true });
    }

    try {
      await interaction.guild.members.unban(userId);
      await interaction.reply(`✅ Unbanned <@${userId}>`);
    } catch (err) {
      console.error('Unban error:', err);
      await interaction.reply('❌ Unable to unban. Make sure the ID is correct and the user is banned.');
    }
  }
};
