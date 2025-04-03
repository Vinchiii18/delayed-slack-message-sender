import React, { useState } from 'react';

interface WebhookInputProps {
  webhookUrl: string;
  setWebhookUrl: (url: string) => void;
}

const WebhookInput: React.FC<WebhookInputProps> = ({ webhookUrl, setWebhookUrl }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWebhookUrl(event.target.value);
  };

  return (
    <div>
      <label htmlFor="webhook-url">Slack Webhook URL:</label>
      <input
        type="text"
        id="webhook-url"
        value={webhookUrl}
        onChange={handleChange}
        placeholder="Enter your Slack webhook URL"
      />
    </div>
  );
};

export default WebhookInput;