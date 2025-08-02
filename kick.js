
module.exports = {
  name: "kick",
  description: "Kick a member from the server",
  options: [
    {
      name: "user",
      description: "The member to kick",
      type: 6,
      required: true
    }
  ],
  run: async (client, interaction) => {
    if (!interaction.member.permissions.has("KickMembers")) {
      return interaction.reply({ content: "❌ You don't have permission to kick members.", ephemeral: true });
    }

    const user = interaction.options.getUser("user");
    if (!user) {
      return interaction.reply({ content: "❌ Please specify a user to kick.", ephemeral: true });
    }

    try {
      const member = await interaction.guild.members.fetch(user.id).catch(() => null);
      if (!member) {
        return interaction.reply({ content: "❌ Member not found in this server.", ephemeral: true });
      }

      if (!member.kickable) {
        return interaction.reply({ content: "❌ I can't kick that member.", ephemeral: true });
      }

      await member.kick(`Kicked by ${interaction.user.tag}`);
      await interaction.reply({ content: `✅ Kicked ${member.user.tag}` });
    } catch (error) {
      console.error('Kick error:', error);
      await interaction.reply({ content: "❌ Failed to kick the member.", ephemeral: true });
    }
  }
};
