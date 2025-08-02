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
    const member = interaction.options.getMember("user");

    if (!interaction.member.permissions.has("KickMembers")) {
      return interaction.reply({ content: "❌ You don’t have permission to kick members.", ephemeral: true });
    }

    if (!member.kickable) {
      return interaction.reply({ content: "❌ I can't kick that member.", ephemeral: true });
    }

    await member.kick();
    await interaction.reply({ content: `✅ Kicked ${member.user.tag}` });
  }
};
