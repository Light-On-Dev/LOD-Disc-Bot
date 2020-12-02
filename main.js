const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = '!';


client.once('ready', () => {
    console.log('LOD is online!');
});

client.on('message', message => {
    if (!message.channel.id == '783580937778757652' || !message.channel.id == '783556445781884928' || !message.author.bot || !message.content.startsWith(prefix)) {
        message.channel.setPosition(0);
    }

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'join') {
        let cst = message.guild.roles.cache.find(r => r.name === "Customer");
        let everyoneRole = message.guild.roles.cache.find(role => role.name === 'Member');

        message.member.roles.set([cst, everyoneRole]);

        message.delete();

        message.guild.channels.create(message.author.username, {
            type: 'text',
            parent: '783541307057504286',
            topic: 'Hey! Here you can easily communicate with us, as this will be the primary method of communication.',
            permissionOverwrites: [{
                    id: message.author.id,
                    allow: ['VIEW_CHANNEL'],
                },
                {
                    id: '783787832589418516',
                    deny: ['VIEW_CHANNEL'],
                },
            ],
        }).then(channel => channel.send("**Hey! Here you can easily communicate with us, as this will be the primary method of communication.**"));
    } else if (command === 'delete') {
        message.channel.delete();
    }
});

client.on('guildMemberAdd', guildMember => {
    let newRole = guildMember.guild.roles.cache.find(role => role.name === 'New Member');
    guildMember.roles.add(newRole);
    let everyoneRole = guildMember.guild.roles.cache.find(role => role.name === 'Member');
    guildMember.roles.add(everyoneRole);
});

client.login(process.env.BOT_TOKEN);