## Prerequisite:
1. Make sure you have `node.js` installed;
2. Make sure you have `docker` installed and deamon is running;

## How to start
1. At the root level initiate `npm run prepare` command and it will:
    - install dependencies both for FE and BE
    - create FE build to serve
    - launch docker instance for `mongodb`
    - run migration to populate DB with bands
2. Run application
    - `npm run dev` - to start server
    - visit `localhost:3001`

Enrichments files are stored under `./files` folder.