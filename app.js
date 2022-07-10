const { Client } = require('discord.js-selfbot-v13');
const http = require('http');
require('dotenv').config();

let channels = process.env.CHANNELS.split(';')

const client = new Client({
    checkUpdate: false
});

client.on('ready', async () => {
  console.log(`${client.user.username} is ready!`);
})

client.on("message", (msg) => {
    if (msg.content == ">IP" && channels.includes(msg.channel.id)) {
        http.get({ 'host': 'api.ipify.org', 'port': 80, 'path': '/' }, function (resp) {
            resp.on('data', function (ip) {
                msg.channel.send("IP: " + ip);
            });
        });
    }
})

client.login(process.env.TOKEN);