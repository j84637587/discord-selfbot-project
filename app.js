const Discord = require('discord.js-selfbot-v13');
const http = require('http');
require('dotenv').config();

let channels = process.env.CHANNELS.split(';')

const client = new Discord.Client({
    checkUpdate: false,
});

client.on('ready', async () => {
  console.log(`${client.user.username} is ready!`);

    const r = new Discord.RichPresence()
      .setApplicationId("817229550684471297")
      .setType("Streaming") // Avaliable types: https://discord.com/developers/docs/game-sdk/activities#data-models-activitytype-enum
      .setURL("https://youtube.com/watch?v=dQw4w9WgXcQ")
    //   .setState("史上最大的大便")
      .setName("大便")
      .setDetails("史上最大的大便")
      .setParty({
        max: 9999,
        current: 1,
        id: Discord.getUUID(),
      })
      .setStartTimestamp(Date.now() - 1_000 * ( 23 * 60**2 + 2 * 60 + 56)) // must lower than 24h
      .setAssetsLargeImage("mp:attachments/820557032016969751/991172011483218010/unknown.png")
      .setAssetsLargeText("大便");
    //   .setAssetsSmallImage("895316294222635008")
    //   .setAssetsSmallText("Bot")
    //   .addButton("name", "https://link.com/");
    client.user.setActivity(r.toJSON());
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

function animation() {
    
}