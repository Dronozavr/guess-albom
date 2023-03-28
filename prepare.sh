#!/bin/bash
node -v
npm i
cd ./front-end && npm install && 
npm run build
cd ../storage && 
docker-compose up -d
cd ../ && npm run migrate
