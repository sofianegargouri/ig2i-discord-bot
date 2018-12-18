import { config as dotenvConfig } from 'dotenv';

import {
  bot,
} from './classes';

import {
  app,
  claim,
  ping,
} from './commands';

dotenvConfig();

const mybot = new bot(process.env.DISCORD_TOKEN);

new app(mybot.client);
new claim(mybot.client);
new ping(mybot.client);
