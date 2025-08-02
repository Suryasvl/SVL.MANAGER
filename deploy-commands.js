const { REST, Routes, SlashCommandBuilder } = require('discord.js');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const commands = [];

// Read all command files
const commandFiles = fs.readdirSync('./').filter(file => file.endsWith('.js') && file !== 'index.js' && file !== 'deploy-commands.js');

for (const file of commandFiles) {
  const command = require(`./${file}`);
  if (command.name && command.description && command.options) {
    commands.push(
      new SlashCommandBuilder()
        .setName(command.name)
        .setDescription(command.description)
        .addUserOption(option => option
          .setName(command.options[0].name)
          .setDescription(command.options[0].description)
          .setRequired(command.options[0].required))
        .toJSON()
    );
  }
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('⏳ Registering slash commands...');

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );

    console.log('✅ Slash commands registered successfully!');
  } catch (error) {
    console.error('❌ Error registering commands:', error);
  }
})();
