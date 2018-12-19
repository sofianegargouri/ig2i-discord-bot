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

    if (!promotion.match(/([0-9]){4}/)) {
      return message
        .member
        .send("Le format de ta commande n'est pas valide. Exemple: `/claim 2019`")
        .then(() => message.delete())
        .catch(() => message.delete());
    }

    const memberRoles = message.member.roles
      .map(role => role)
      .filter(role => role.name.match(/([0-9]){4}/));

    if (memberRoles.length > 0) {
      return message
        .member
        .send("Nous ne t'avons pas ajouté au groupe car tu en as déjà un.")
          .then(() => message.delete())
          .catch(() => message.delete());
    }

    if (!(role instanceof Role)) {
      return message.member.send("Nous n'avons pas trouvé de groupe correspondant à ta requête");
    }

    message.member.addRole(role)
      .then(() =>
        message.member.send(`Tu as bien été ajouté au groupe ${role.name}`)
          .then(() => message.delete())
          .catch(() => message.delete()))
      .catch(() =>
        message.member.send(`Il y a eu une erreur lors de l'ajout au groupe ${role.name}`)
          .then(() => message.delete())
          .catch(() => message.delete()));
  }
}
