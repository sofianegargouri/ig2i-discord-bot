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

    message.delete();

    if (!(role instanceof Role)) {
      return message.member.send("Nous n'avons pas trouvé de groupe correspondant à ta requête");
    }

    message.member.addRole(role)
      .then(() =>
        message.member.send(`Tu as bien été ajouté au groupe ${role.name}`))
      .catch(() =>
        message.member.send(`Il y a eu une erreur lors de l'ajout au groupe ${role.name}`));
  }
}
