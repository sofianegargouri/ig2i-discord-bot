import { Client, Message } from 'discord.js';

export default class Ping {
  private client: Client;

  constructor(client: Client) {
    this.client = client;

    this.client.on('message', message => this.handleCommand(message));
  }

  handleCommand(message: Message) {
    if (!message.content.startsWith('/ping')) {
      return null;
    }

    message.channel.send('/pong');
  }
}
