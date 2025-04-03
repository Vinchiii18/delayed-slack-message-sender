import React from 'react';

type MessageInputProps = {
  message: string;
  setMessage: (message: string) => void;
};

const MessageInput: React.FC<MessageInputProps> = ({ message, setMessage }) => {
  return (
    <div className="mb-3">
      <label htmlFor="messageInput" className="form-label">
        Slack Message
      </label>
      <textarea
        id="messageInput"
        className="form-control"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your Slack message"
        rows={3} // Dynamic height
      ></textarea>
    </div>
  );
};

export default MessageInput;