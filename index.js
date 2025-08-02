const keepAlive = require("./keepAlive");
keepAlive();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
require('dotenv').config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers],
});

client.commands = new Collection();

// Load all commands
const commandFiles = fs.readdirSync('./').filter(file => file.endsWith('.js') && file !== 'index.js' && file !== 'deploy-commands.js');
for (const file of commandFiles) {
  const command = require(`./${file}`);
  // Skip empty files
  if (Object.keys(command).length === 0) continue;
  
  // Handle new format (SlashCommandBuilder with data property)
  if (command.data && command.data.name) {
    client.commands.set(command.data.name, command);
  }
  // Handle old format (direct name property)
  else if (command.name) {
    client.commands.set(command.name, command);
  }
}

// Handle messages (prefix)
const prefix = 's';
client.on('messageCreate', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName);
  if (command) command.execute(message, args);
});

// Slash command interaction
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  
  const command = client.commands.get(interaction.commandName);
  if (!command) {
    console.log(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    console.log(`Executing command: ${interaction.commandName}`);
    
    // Handle new format (data property with execute method)
    if (command.execute) {
      await command.execute(interaction);
    }
    // Handle old format (executeSlash method)
    else if (command.executeSlash) {
      await command.executeSlash(interaction);
    }
    // Handle kick.js format (run method)
    else if (command.run) {
      await command.run(client, interaction);
    }
    else {
      console.log(`Command ${interaction.commandName} has no execute method.`);
      await interaction.reply({ content: '❌ Command not properly configured.', ephemeral: true });
    }
  } catch (error) {
    console.error(`Error executing ${interaction.commandName}:`, error);
    
    const errorResponse = { content: '❌ There was an error executing this command!', ephemeral: true };
    
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(errorResponse);
    } else {
      await interaction.reply(errorResponse);
    }
  }
});

client.once('ready', () => {
  console.log(`${client.user.tag} is online!`);
});

client.login(process.env.TOKEN);
