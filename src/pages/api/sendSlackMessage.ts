import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { message, webhookUrl } = req.body;

        if (!message || !webhookUrl) {
            return res.status(400).json({ error: 'Missing message or webhookUrl' });
        }

        const formattedMessage = `From Your Name's Slack Bot: ${message}`;

        try {
            await axios.post(webhookUrl, {
                text: formattedMessage,
            });
            return res.status(200).json({ success: true });
        } catch (error) {
            console.error('Error sending message to Slack:', error);
            return res.status(500).json({ error: 'Failed to send message to Slack' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}