import discordJs, { Client, GuildMember } from 'discord.js';
import { movies } from '../constants';

export default class Bot {
  public client: Client;
  private token: string | undefined;
  private statusIndex: number = 1;

  constructor(token: string | undefined) {
    this.client = new discordJs.Client();
    this.token = token;

    this.login()
      .then(() => {
        this.setJoinhook();
        this.setStatus();
      });
  }

  login() {
    return this.client.login(this.token);
  }

  setJoinhook() {
    this.client.on('guildMemberAdd', (member: GuildMember) => {
      member.user.send(`Hello ! :wave:

Bienvenue sur le **Discord de 2i**. Pour bien t'intégrer, je t'invite à faire les étapes suivantes:

- Renomme-toi avec ton prénom/nom afin d'être identifiable par tout le monde
- Rejoins ta promotion: \`/claim <année de promotion>\`
- **Bonus**: Si tu es apprenti: \`/app\`

N'hésite pas à MP un admin si tu as des soucis ! :wink:`);
    });
  }

  setStatus() {
    this.client.user.setActivity(movies[0], { type: 'WATCHING' });

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
