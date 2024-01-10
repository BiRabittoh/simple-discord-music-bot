import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { getChannel, getQueue } from '../functions/music';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skip current track.'),

    async execute(interaction: ChatInputCommandInteraction) {
        const channel = await getChannel(interaction);
        if (typeof channel == 'string')
            return await interaction.reply({ content: channel, ephemeral: true });

        const queue = getQueue(interaction.guildId);
        const result = await queue.next();
        return await interaction.reply({ content: 'Skipped.' });
    },
};
