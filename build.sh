#!/bin/bash
source /home/ec2-user/.nvm/nvm.sh
nvm use 6.9.5
cd /home/ec2-user/app/ribbonTrader
npm run build
