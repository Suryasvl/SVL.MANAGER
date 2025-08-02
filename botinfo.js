const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const os = require('os');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('botinfo')
    .setDescription('Displays info about the bot'),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('🤖 Bot Information')
      .setColor('Blue')
      .addFields(
        { name: 'Bot Tag', value: `${interaction.client.user.tag}`, inline: true },
        { name: 'Ping', value: `${interaction.client.ws.ping}ms`, inline: true },
        { name: 'Servers', value: `${interaction.client.guilds.cache.size}`, inline: true },
        { name: 'Platform', value: `${os.platform()}`, inline: true }
      );
    await interaction.reply({ embeds: [embed] });
  }
};