const { MessageEmbed } = require("discord.js");
const { greenlight } = require("../../JSON/colours.json")

module.exports = {
    config: {
        name: "say",
        category: "fun",
        noalias: "No Aliases",
        description: "Says your input via the bot",
        usage: "[text]",
        accessableby: "everyone"
    },
    run: (bot, message, args) => {

        if (args.length === 0)
            return message.channel.send("**Enter Some Text!**")
        message.delete({ timeout: 1000 })

        const embed = new MessageEmbed()
            .setDescription(args.join(" "))
            .setColor(greenlight);

        message.channel.send(embed)
    }
}
