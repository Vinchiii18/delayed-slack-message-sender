import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import DelayInput from '../components/DelayInput';
import MessageInput from '../components/MessageInput';
import WebhookInput from '../components/WebhookInput';
import SendButton from '../components/SendButton';

const IndexPage = () => {
  const [delay, setDelay] = useState<number | ''>('');
  const [unit, setUnit] = useState<string>('seconds');
  const [message, setMessage] = useState<string>('');
  const [webhookUrl, setWebhookUrl] = useState<string>('');

  const handleSendMessage = async () => {
    if (delay && message && webhookUrl) {
      const delayInMilliseconds = convertDelayToMilliseconds(delay, unit);
      await new Promise((resolve) => setTimeout(resolve, delayInMilliseconds));

      try {
        const response = await fetch('/api/sendSlackMessage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message, webhookUrl }),
        });

        if (!response.ok) {
          throw new Error('Failed to send message to Slack');
        }

        console.log('Message sent successfully!');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const convertDelayToMilliseconds = (delay: number | '', unit: string) => {
    if (typeof delay === 'number') {
      switch (unit) {
        case 'seconds':
          return delay * 1000;
        case 'minutes':
          return delay * 60000;
        case 'hours':
          return delay * 3600000;
        default:
          return 0;
      }
    }
    return 0;
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h1 className="card-title text-center mb-4">Delayed Slack Message Sender</h1>
          <DelayInput
            onDelayChange={(value, unit) => {
              setDelay(value);
              setUnit(unit);
            }}
          />
          <MessageInput message={message} setMessage={setMessage} />
          <WebhookInput webhookUrl={webhookUrl} setWebhookUrl={setWebhookUrl} />
          <div className="text-center mt-4">
            <SendButton
              delay={typeof delay === 'number' ? delay : 0}
              delayUnit={unit}
              message={message}
              webhookUrl={webhookUrl}
              onSend={handleSendMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;