# Discord Bots

This repository contains two unique and feature-rich Discord bots: **i.am.prime** and **quantum.byte**. Below is a breakdown of their commands and capabilities:

## i.am.prime Bot
A versatile bot that allows you to interact with emotes, games, server management, and more. Some key features include:

### Key Features:
- **Emote Commands**:
  - `emote`: Send animated or normal emotes, even from another server, as long as i.am.prime is there.
  - `listEmotes`: View all available emotes.
  - `Random Emote`: Sends a random emote.
  - `Random React`: Sends a random reaction emote.
- **Games**:
  - `get`: A fun unboxing game.
  - `i.`: An idle game.
- **Server Management**:
  - `Server Info`: Displays server details.
  - `User Info`: Displays user information.
  - `Ping`: Test the bot's response time and API latency.
  - `Prefix`: Change the bot prefix for the server.
  - `Connect`: Link multiple servers together using the `InterMessaging` command.
- **Message Interaction**:
  - `Snipe`: Snipes deleted messages.
  - `SnipEdit`: Snipes edited messages.
- **Miscellaneous**:
  - `SetWelcome`: (Does not work).
  - `Teach`: (Does not work, was intended to teach the bot AI to talk in a specific way).
  - `Test`: Placeholder for testing commands.

## quantum.byte Bot
A multi-purpose bot with features for unboxing games, music, and more. Here are some of its capabilities:

### Key Features:
- **Unboxing Game**: MongoDB integration for unboxing items, related to CSGO skins.
- **Music**: Play music in voice channels.
- **Fun Commands**:
  - `Rock Paper Scissors`: Rock, Paper, Scissors.
  - `Purge`: Bulk delete messages in a channel.
  - `Decide`: Get a random "Yes" or "No" decision.
- **Message Interaction**:
  - `Send`: Send a message to another server.
  - `Delete`: Delete a message from another server.
- **Reaction Roles**: (Possible unverified functionality).
- **Code Evaluation**:
  - `Js` & `Py`: Evaluate JavaScript and Python code (Use with caution, as there's no security in place).
- **Admin Role**: `GiveMe`: Try to obtain the admin role if it exists (Caution: potentially dangerous).

**Note**: The bot includes MongoDB integration and plays music, providing a wide range of features, including interactive games and tools for managing servers.

---

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/TheEmptynessProject/Discord-Bot
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Set up your bot’s token and environment variables as instructed in the config files.
4. Run the bot:
   ```bash
   node bot.js
   ```

---
