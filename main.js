const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = '!';


client.once('ready', () => {
    console.log('LOD is online!');
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'join') {
        let cst = message.guild.roles.cache.find(r => r.name === "Customer");

        message.member.roles.set([cst]);
        
        message.delete();

        message.guild.channels.create(message.author.username, {
            type: 'text',
            parent: '783541307057504286',
            topic: 'Hey! Here you can easily communicate with us, as this will be the primary method of communication.',
        });
    }
});

client.on('guildMemberAdd', guildMember => {
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'New Member');
    guildMember.roles.add(welcomeRole);
});

client.login(process.env.BOT_TOKEN);