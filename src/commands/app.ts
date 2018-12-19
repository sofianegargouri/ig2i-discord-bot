import { Client, Message, Role } from 'discord.js';

export default class Claim {
  private client: Client;

  constructor(client: Client) {
    this.client = client;

    this.client.on('message', message => this.handleCommand(message));
  }

  handleCommand(message: Message) {
    if (!message.content.startsWith('/app')) {
      return null;
    }

    const role = message.guild.roles.find(role => role.name.toLowerCase().includes('apprenti'));

    if (!(role instanceof Role)) {
      message.delete();
      return message.member.send("Nous n'avons pas trouvé de groupe correspondant à ta requête");
    }

    message.member.addRole(role)
      .then(() => {
        if (!message.member.nickname.includes('💰')) {
          message.member.setNickname(`${message.member.nickname} 💰`);
        }
        message.member.send(`Tu as bien été ajouté au groupe ${role.name}`);
        message.delete();
      })
      .catch(() => {
        message.member.send(`Il y a eu une erreur lors de l'ajout au groupe ${role.name}`);
        message.delete();
      });
  }
}