const {  AttachmentBuilder, ApplicationCommandOptionType, PermissionsBitField, EmbedBuilder } = require("discord.js");
const QRCode = require('qrcode');
const { Error } = require('../../utils/Error')

module.exports = {
    name: "qr-code",
    permissions: ["UseApplicationCommands"],
    usage: "/qr-code `[contenu: contenu]`",
    example: "/qr-code `[contenu: https://invite.tadashibot.com/]`",
    category: "🥳 Fun",
    description: "Permet de générer un QR-Code",
    options: [
        {
            name: "contenu",
            description: "Contenu du QR-Code",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    async runInteraction(client, interaction) {
        const content = interaction.options.getString("contenu")

        if(!content.startsWith("https://") && !content.startsWith("www.")) return Error(interaction, "Le contenu du QR-Code n'est pas un lien, j'accepte que les liens ! 😉")
        let image = await QRCode.toBuffer(content)
        const imagex = new AttachmentBuilder(image, { name: "qrcode-by-tadashi.png" })

        const embed = new EmbedBuilder()
            .setTitle("QR Code 📷")
            .setDescription(`Redirection : \`${content}\``)
            .setImage("attachment://qrcode-by-tadashi.png")
            .setColor(client.color)

        interaction.reply({ embeds: [embed], files: [imagex] })   
    }
}