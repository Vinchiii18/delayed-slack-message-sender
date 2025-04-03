import React, { useState, useEffect } from 'react';

interface MessageInputProps {
    message: string;
    setMessage: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ message, setMessage }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    };

    return (
        <div>
            <label htmlFor="message">Slack Message:</label>
            <input
                type="text"
                id="message"
                value={message}
                onChange={handleChange}
                placeholder="Enter your message"
            />
        </div>
    );
};

export default MessageInput;