import { config as dotenvConfig } from 'dotenv';

import {
  bot,
} from './classes';

import {
  claim,
  ping,
} from './commands';

dotenvConfig();

const mybot = new bot(process.env.DISCORD_TOKEN);

new claim(mybot.client);
new ping(mybot.client);
