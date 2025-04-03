# Delayed Slack Message Sender

This project is a simple web application that allows users to schedule messages to be sent to a Slack channel after a specified delay. The application is built using Next.js and TypeScript.

## Features

- Input for delay amount with unit selection (seconds, minutes, hours).
- Input for the content of the Slack message.
- Input for the Slack channel webhook URL.
- A dynamic button that updates based on the delay input.
- Sends a formatted message to Slack after the specified delay.

## Getting Started

To get a local copy up and running, follow these steps:

### Prerequisites

- Node.js (version 14 or later)
- npm (Node Package Manager)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/delayed-slack-message-sender.git
   ```

2. Navigate to the project directory:
   ```
   cd delayed-slack-message-sender
   ```

3. Install the dependencies:
   ```
   npm install
   ```

### Running the Application

To start the development server, run:
```
npm run dev
```

Open your browser and navigate to `http://localhost:3000` to view the application.

## Usage

1. Enter the desired delay amount and select the unit (seconds, minutes, hours).
2. Type the message you want to send to Slack.
3. Input the Slack webhook URL for the channel where the message should be sent.
4. Click the "Send in XXX" button to schedule the message.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.