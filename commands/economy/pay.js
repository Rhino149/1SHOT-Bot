const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
  config: {
    name: "pay",
    noalias: [""],
    category: "economy",
    description: "Pay to Somebody",
    usage: "[mention | ID] <amount>",
    accessableby: "everyone"
  },
  run: async (bot, message, args) => {
try {
    if (!args[0]) return message.channel.send("**Please Enter A User!**");
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        r => r.displayName.toLowerCase() === args[0].toLocaleLowerCase()
      );
    if (!user) return message.channel.send("**Enter A Valid User!**");
    let a = [
      "-",
      "`",
      "/",
      "_",
      "+",
      "=",
      ";",
      ":",
      ".",
      ",",
      "?",
      "|",
      "'",
      '"',
      ">",
      "<",
      "}",
      "{",
      "[",
      "]",
      ")",
      "(",
      "*",
      "&",
      "^",
      "%",
      "$",
      "#",
      "@",
      "!",
      "~"
    ];

    let member = db.fetch(`money_${message.guild.id}_${message.author.id}`);

    let embed1 = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(`❌ Mention someone to pay`);

    if (!args[0]) {
      return message.channel.send(embed1);
    }
    let embed2 = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(`❌ You cannot pay yourself`);

    if (user.user.id === message.author.id) {
      return message.channel.send(embed2);
    }

    let embed3 = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(`❌ Specify an amount to pay`);

    if (!args[1]) {
      return message.channel.send(embed3);
    }
    let embed4 = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(`❌ Cannot Add Negative Amount!`);

    if (!parseInt(args[1])) {
      return message.channel.send(embed4);
    }
    let embed5 = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(`❌ You don't have that much money`);

    if (member < args[1]) {
      return message.channel.send(embed5);
    }

    let embed6 = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(`✅ You have payed ${user.displayName} ${args[1]} coins`);

    message.channel.send(embed6);
    db.add(`money_${message.guild.id}_${user.user.id}`, args[1]);
    db.subtract(`money_${message.guild.id}_${message.author.id}`, args[1]);
    } catch {

    }
  }
};