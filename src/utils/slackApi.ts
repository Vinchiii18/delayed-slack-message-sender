import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { message, webhookUrl } = req.body;

        // Log the incoming request data
        console.log('Incoming request:');
        console.log('Message:', message);
        console.log('Webhook URL:', webhookUrl);

        if (!message || !webhookUrl) {
            console.error('Missing message or webhookUrl');
            return res.status(400).json({ error: 'Missing message or webhookUrl' });
        }

        const formattedMessage = `From Your Name's Bot: ${message}`;
        console.log('Formatted Message:', formattedMessage);

        try {
            // Determine if the webhook is for Slack or Discord
            const isDiscordWebhook = webhookUrl.includes('discord.com');
            console.log('Is Discord Webhook:', isDiscordWebhook);

            // Prepare the payload based on the webhook type
            const payload = isDiscordWebhook
                ? { content: formattedMessage } // Discord uses "content"
                : { text: formattedMessage }; // Slack uses "text"

            console.log('Payload being sent:', payload);

            // Send the POST request to the webhook URL
            const response = await axios.post(webhookUrl, payload);

            // Log the response status and data
            console.log('Response status:', response.status);
            console.log('Response data:', response.data);

            // Check if Discord webhook responds with an error
            if (isDiscordWebhook && response.status !== 204) {
                console.error('Discord webhook failed:', response.data);
                throw new Error('Failed to send message to Discord');
            }

            // Check if Slack webhook responds with an error
            if (!isDiscordWebhook && response.status !== 200) {
                console.error('Slack webhook failed:', response.data);
                throw new Error('Failed to send message to Slack');
            }

            console.log('Message sent successfully!');
            return res.status(200).json({ success: true });
        } catch (error) {
            // Log the error details
            // console.error('Error sending message:', error.response?.data || error.message);
            return res.status(500).json({ error: 'Failed to send message' });
        }
    } else {
        console.error(`Method ${req.method} Not Allowed`);
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}