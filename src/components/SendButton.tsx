import React from 'react';

interface SendButtonProps {
    delay: number;
    delayUnit: string;
    message: string;
    webhookUrl: string;
    onSend: () => void;
}

const SendButton: React.FC<SendButtonProps> = ({ delay, delayUnit, message, webhookUrl, onSend }) => {
    const getDelayText = () => {
        if (delay > 0) {
            return `Send in ${delay} ${delayUnit}`;
        }
        return 'Send';
    };

    const isDisabled = !delay || !message || !webhookUrl;

    const handleClick = () => {
        if (!isDisabled) {
            onSend();
        }
    };

    return (
        <button
            onClick={handleClick}
            disabled={isDisabled}
            className="btn btn-primary"
        >
            {getDelayText()}
        </button>
    );
};

export default SendButton;