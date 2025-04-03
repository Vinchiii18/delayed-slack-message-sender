import React from 'react';

type WebhookInputProps = {
  webhookUrl: string;
  setWebhookUrl: (url: string) => void;
};

const WebhookInput: React.FC<WebhookInputProps> = ({ webhookUrl, setWebhookUrl }) => {
  return (
    <div className="mb-3">
      <label htmlFor="webhookInput" className="form-label">
        Slack Webhook URL
      </label>
      <input
        id="webhookInput"
        type="url"
        className="form-control"
        value={webhookUrl}
        onChange={(e) => setWebhookUrl(e.target.value)}
        placeholder="Enter your Slack Webhook URL"
      />
    </div>
  );
};

export default WebhookInput;