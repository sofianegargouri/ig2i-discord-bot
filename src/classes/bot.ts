import discordJs, { Client } from 'discord.js';
import { movies } from '../constants';

export default class Bot {
  public client: Client;
  private token: string | undefined;
  private statusIndex: number = 0;

  constructor(token: string | undefined) {
    this.client = new discordJs.Client();
    this.token = token;

    this.login();
    this.setStatus();
  }

  login() {
    this.client.login(this.token);
  }

  setStatus() {
    setInterval(
      () => {
        if (this.statusIndex + 1 >= movies.length) {
          this.statusIndex = 0;
        } else {
          this.statusIndex += 1;
        }
        this.client.user.setActivity(movies[this.statusIndex], { type: 'WATCHING' });
      },
      60000,
    );
  }
}
