const Discord = require("discord.js-selfbot-v13");
const http = require("http");
const config = require("config");

const token = config.get("TOKEN");
let channels = config.get("CHANNELS");
let frames = config.get("RichPresenceFrames");
let animationEnable = false;
let animationInternalID;

const client = new Discord.Client({
  checkUpdate: false,
});

client.once("ready", async () => {
  console.log(`${client.user.username} is ready!`);
  console.log("Working on channel: ", channels);
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
    .setStartTimestamp(Date.now() - 1_000 * (23 * 60 ** 2 + 2 * 60 + 56)) // must lower than 24h
    .setAssetsLargeImage(
      "mp:attachments/820557032016969751/991172011483218010/unknown.png"
    )
    .setAssetsLargeText("大便");
  //   .setAssetsSmallImage("895316294222635008")
  //   .setAssetsSmallText("Bot")
  //   .addButton("name", "https://link.com/");
  client.user.setActivity(r.toJSON());
  animationInternalID = setInterval(animation, 1000);
});

client.on("messageCreate", async (msg) => {
  //   console.log(msg.channel.id, channels.includes(msg.channel.id));
  if (channels.includes(msg.channel.id)) {
    if (msg.content == ">IP") {
      http.get({ host: "api.ipify.org", port: 80, path: "/" }, function (resp) {
        resp.on("data", function (ip) {
          msg.channel.send("IP: " + ip);
        });
      });
    } else if (msg.content == ">members") {
        const guild = client.guilds.cache.get(msg.guild.id);
        await guild.members.fetch({ force: true });
        console.log(`Listing ${guild.members.cache.size} members from ${guild.name}.`);
        guild.members.cache.forEach(member => {
            console.log(`${member.user.tag} (ID: ${member.id})`);
        });
    }
  }
});

client.login(token); // 啟用 self bot

function animation() {
  let r;

  state = 0;
  presences = [
    { type: "PLAYING", message: "a game" },
    { type: "WATCHING", message: "a video" },
  ];

  state = (state + 1) % presences.length;
  const presence = presences[state];

  while (animationEnable) {
    frames.forEach((frame) => {
      console.log(frame);
      //   r = new Discord.RichPresence()
      //     .setApplicationId("817229550684471297")
      //     //   .setType("Streaming") // Avaliable types: https://discord.com/developers/docs/game-sdk/activities#data-models-activitytype-enum
      //     .setType(presence.type)
      //     .setURL("https://youtube.com/watch?v=dQw4w9WgXcQ")
      //     // .setName("大便")
      //     .setName(presence.message)
      //     .setDetails("史上最大的大便")
      //     .setParty({
      //       max: 9999,
      //       current: 1,
      //       id: Discord.getUUID(),
      //     })
      //     .setStartTimestamp(Date.now() - 1_000 * (23 * 60 ** 2 + 2 * 60 + 56)) // must lower than 24h
      //     .setAssetsLargeImage(frame)
      //     .setAssetsLargeText("大便");
      //   client.user.setActivity(r.toJSON());
      const r = new Discord.CustomStatus()
        .setState(presences.message)
        .setEmoji("💬");
      client.user.setActivity(r.toJSON());
      sleep(500);
    });
  }
}

/**
 * 使用 while, time 實現 sleep 功能
 *
 * @param {number} delay
 */
function sleep(delay) {
  var start = new Date().getTime();
  while (new Date().getTime() - start < delay) {
    continue;
  }
}
