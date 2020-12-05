const Discord = require('discord.js');
const client = new Discord.Client();
const ignore = ['783556445781884928', '783828083974864896']
const prefix = '!';


client.once('ready', () => {
    console.log('LOD is online!');
});

client.on('message', message => {
    if (ignore.includes(message.channel.id)) {
        return;
    }

    if (!message.author.bot || !message.content.startsWith(prefix)) {
        message.channel.setPosition(0);
    }

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (message.content.includes('nick')) {
        message.delete();
        if (!message.guild.me.hasPermission('MANAGE_NICKNAMES')) return message.channel.send('I don\'t have permission to change your nickname!');
        message.member.setNickname(message.content.replace('!nick ', ''));
    }

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
    } else if (command === 'links') {
        const linksEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .addFields({
                name: 'Our Website',
                value: 'https://lightondev.xyz',
                inline: true
            }, )

        message.channel.send(linksEmbed);
    }
});

client.on('guildMemberAdd', guildMember => {
    let newRole = guildMember.guild.roles.cache.find(role => role.name === 'New Member');
    guildMember.roles.add(newRole);
    let everyoneRole = guildMember.guild.roles.cache.find(role => role.name === 'Member');
    guildMember.roles.add(everyoneRole);
});

client.login('BOT TOKEN');