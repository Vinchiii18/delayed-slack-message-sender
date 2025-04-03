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

    const handleClick = async () => {
        if (!isDisabled) {
            try {
                await onSend(); // Wait for the `onSend` function to complete
                alert('Message has been sent successfully!'); // Show success alert
            } catch (error) {
                alert('Failed to send the message. Please try again.'); // Show error alert
            }
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