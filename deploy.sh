#!/bin/bash

# Update the codebase
git pull origin master

# Build the app
yarn build

# Start with PM2
pm2 delete discord-bot
pm2 start dist/index.js --name=discord-bot
