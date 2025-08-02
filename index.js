const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
require('dotenv').config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers],
});

client.commands = new Collection();

// Load all commands
const commandFiles = fs.readdirSync('./').filter(file => file.endsWith('.js') && file !== 'index.js');
for (const file of commandFiles) {
  const command = require(`./${file}`);
  if (command.name) {
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
  if (!interaction.isCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (command) {
    try {
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
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: '❌ There was an error.', ephemeral: true });
    }
  }
});

client.once('ready', () => {
  console.log(`${client.user.tag} is online!`);
});

client.login(process.env.TOKEN);
