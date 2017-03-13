#!/bin/bash
source /home/ubuntu/.nvm/nvm.sh
nvm use 6.9.5
/home/ubuntu/app/node_modules/.bin/pm2 restart 0