import { Client, Message, Role } from 'discord.js';

export default class Claim {
  private client: Client;

  constructor(client: Client) {
    this.client = client;

    this.client.on('message', message => this.handleCommand(message));
  }

  handleCommand(message: Message) {
    if (!message.content.startsWith('/claim')) {
      return null;
    }

    const [_, promotion] = message.content.split(' ');

    const role = message.guild.roles.find(role => role.name.includes(promotion));

    message.delete();

    if (!promotion.match(/([0-9]){4}/)) {
      return message
        .member
        .send("Le format de ta commande n'est pas valide. Exemple: `/claim 2019`");
    }

    const memberRoles = message.member.roles.map(role => role.id);

    // memberRoles.length > 1 car @everyone est un rôle attribué à tout le monde
    if (memberRoles.length > 1) {
      return message
        .member
        .send("Nous ne t'avons pas ajouté au groupe car tu en as déjà un.");
    }

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
