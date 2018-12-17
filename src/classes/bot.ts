import discordJs, { Client } from 'discord.js';

export default class Bot {
  public client: Client;

  constructor(token: string | undefined) {
    this.client = new discordJs.Client();

    this.client.login(token);
  }
}
