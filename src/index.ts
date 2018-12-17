import { config as dotenvConfig } from 'dotenv';

import {
  bot,
} from './classes';

import {
  ping,
} from './commands';

dotenvConfig();

const mybot = new bot(process.env.DISCORD_TOKEN);

new ping(mybot.client);
