import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { message, webhookUrl } = req.body;

        if (!message || !webhookUrl) {
            return res.status(400).json({ error: 'Missing message or webhookUrl' });
        }

        const formattedMessage = `From Alvin Pablico Consular Bot: ${message}`;

        try {
            // Determine if the webhook is for Slack or Discord
            const isDiscordWebhook = webhookUrl.includes('discord.com');

            // Prepare the payload based on the webhook type
            const payload = isDiscordWebhook
                ? { content: formattedMessage } // Discord uses "content"
                : { text: formattedMessage }; // Slack uses "text"

            // Send the POST request to the webhook URL
            const response = await axios.post(webhookUrl, payload);

            // Check if Discord webhook responds with an error
            if (isDiscordWebhook && response.status !== 204) {
                throw new Error('Failed to send message to Discord');
            }

            // Check if Slack webhook responds with an error
            if (!isDiscordWebhook && response.status !== 200) {
                throw new Error('Failed to send message to Slack');
            }

            return res.status(200).json({ success: true });
        } catch (error) {
            // console.error('Error sending message:', error.response?.data || error.message);
            return res.status(500).json({ error: 'Failed to send message' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}