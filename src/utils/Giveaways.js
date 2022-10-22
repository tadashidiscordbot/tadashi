const { GiveawaysManager } = require('discord-giveaways');
const giveawayModel = require('../models/giveawayModel')

module.exports = (client) => {
    const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {
        async getAllGiveaways() {
            return await giveawayModel.find().lean().exec();
        }
    
        // This function is called when a giveaway needs to be saved in the database.
        async saveGiveaway(messageId, giveawayData) {
            // Add the new giveaway to the database
            await giveawayModel.create(giveawayData);
            // Don't forget to return something!
            return true;
        }
    
        // This function is called when a giveaway needs to be edited in the database.
        async editGiveaway(messageId, giveawayData) {
            // Find by messageId and update it
            await giveawayModel.updateOne({ messageId }, giveawayData).exec();
            // Don't forget to return something!
            return true;
        }
    
        // This function is called when a giveaway needs to be deleted from the database.
        async deleteGiveaway(messageId) {
            // Find by messageId and delete it
            await giveawayModel.deleteOne({ messageId }).exec();
            // Don't forget to return something!
            return true;
        }
    };

    
    const manager = new GiveawayManagerWithOwnDatabase(client, {
        default: {
            botsCanWin: false,
            embedColor: '#FF0000',
            embedColorEnd: '#000000',
            reaction: '🎉'
        }
    });

    client.giveawaysManager = manager;
}