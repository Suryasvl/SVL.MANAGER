
const { REST, Routes, SlashCommandBuilder } = require('discord.js');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const commands = [];

// Read all command files
const commandFiles = fs.readdirSync('./').filter(file => file.endsWith('.js') && file !== 'index.js' && file !== 'deploy-commands.js');

for (const file of commandFiles) {
  const command = require(`./${file}`);
  
  // Handle new format (SlashCommandBuilder)
  if (command.data) {
    commands.push(command.data.toJSON());
  }
  // Handle old format
  else if (command.name && command.description && command.options) {
    const slashCommand = new SlashCommandBuilder()
      .setName(command.name)
      .setDescription(command.description);
    
    // Add options
    for (const option of command.options) {
      if (option.type === 6) { // USER type
        slashCommand.addUserOption(opt => opt
          .setName(option.name)
          .setDescription(option.description)
          .setRequired(option.required || false));
      }
    }
    
    commands.push(slashCommand.toJSON());
  }
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log(`⏳ Registering ${commands.length} slash commands...`);

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );

    console.log('✅ Slash commands registered successfully!');
  } catch (error) {
    console.error('❌ Error registering commands:', error);
  }
})();
