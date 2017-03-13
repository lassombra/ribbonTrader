#!/bin/bash
source /home/ec2-user/.nvm/nvm.sh
nvm use 6.9.5
/home/ec2-user/app/node_modules/.bin/pm2 restart 0