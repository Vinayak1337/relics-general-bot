# Relics General Bot

Relics General is a Discord bot designed to streamline and enhance the operations of the [Relics](https://twitter.com/@relics_global) Organisation. Crafted with Node.js and JavaScript, it offers a suite of features to facilitate communication, management, and fun within the Discord community.

## Data Management

The bot primarily relies on a `.csv` file for data storage, manipulation, and retrieval. This approach ensures quick access and easy management. However, for the modmail feature, the bot leverages MongoDB and Mongoose, ensuring efficient and reliable data storage and retrieval.

## Features

### Modmail System

A cornerstone feature of the bot, the modmail system, is designed to facilitate communication between users and the moderation team. When a user sends a direct message to the bot, it triggers the creation of a ticket within the server. This ticket allows moderators to address and resolve the user's concerns. The entire lifecycle of the ticket, from creation to deletion, is logged in a dedicated channel. Upon ticket deletion, a `.html` file is attached, serving as a transcript that replicates the Discord channel UI, providing a comprehensive record of the ticket's interactions.

### Role Management

- **Color Roles**: Users can assign themselves color roles, allowing for personalization and easy identification.
  
- **Reaction Roles**: Through reactions, users can assign themselves specific roles, streamlining the role assignment process.

### Cross-Server Announcements

The bot facilitates organization-wide announcements without the need for individual server bot integrations. Servers can provide a webhook link, and the bot will push announcements from the main organization channel to all linked servers. Additionally, manual announcements to all organization-affiliated servers can be made via a specific command.

### Fun Commands

- **ASCII Conversion**: Transforms input text into ASCII art.
  
- **Emoji Text**: Converts standard text into its emoji counterpart.
  
- **Channel Beautification**: Enhances channel and category names, giving them a polished and professional appearance.
  
- **Trump Tweet Image**: Generates an image mimicking a tweet from Trump, with user-defined content.
  
- **Utility Commands**: A collection of commands designed to enhance user experience and server management.

## License

This project is licensed under the terms of the [MIT License](https://github.com/Vinayak1337/relics-general-bot/blob/master/LICENSE).

