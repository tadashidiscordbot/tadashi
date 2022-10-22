const { EmbedBuilder } = require("discord.js")

module.exports = {
    name: "help",
    async runInteraction(client, interaction) {
        if (interaction.values == "help-home") {
            await interaction.update({ embeds: [
                new EmbedBuilder()
                    .setTitle("🏠 Accueil")
                    .setDescription(`- Utiliser \`/help (commande: commande)\` pour voir les détails d'une commande.\n- Nombre de commandes disponible : \`${client.commands.size}\`\n\n**-> Veuillez utiliser le sélécteur ci-dessous pour accéder aux commandes :**`)
                    .setFooter({
                        text: "help",
                        iconURL: interaction.user.displayAvatarURL({dynamic: true})
                    })
                    .setColor(client.color)
                    .setTimestamp()
            ] })
        }


        if (interaction.values == "help-admin") {
            let commands = client.commands.filter(cmd => cmd.category === "🔨 Modération")
            await interaction.update({ embeds: [
                new EmbedBuilder()
                    .setTitle("🔨 Commandes de modération")
                    .setDescription(`${commands.map(cmd => `**${cmd.name}** : ${cmd.description}`).join("\n")}`)
                    .setColor(client.color)
                    .setFooter({ 
                        text: "Commande synchronisé via la collection"
                     })
                ]
            })
        }

        if (interaction.values == "help-utility") {
            let commands = client.commands.filter(cmd => cmd.category === "⚙️ Utilités")
            await interaction.update({ embeds: [
                new EmbedBuilder()
                    .setTitle("⚙️ Commandes de utilités")
                    .setDescription(`${commands.map(cmd => `**${cmd.name}** : ${cmd.description}`).join("\n")}`)
                    .setColor(client.color)
                    .setFooter({ 
                        text: "Commande synchronisé via la collection"
                     })
                ]
            })
        }

        if (interaction.values == "help-fun") {
            let commands = client.commands.filter(cmd => cmd.category === "🥳 Fun")
            await interaction.update({ embeds: [
                new EmbedBuilder()
                    .setTitle("🥳 Commandes de fun")
                    .setDescription(`${commands.map(cmd => `**${cmd.name}** : ${cmd.description}`).join("\n")}`)
                    .setColor(client.color)
                    .setFooter({ 
                        text: "Commande synchronisé via la collection"
                     })
            
                ]
            })
        }
    }
}