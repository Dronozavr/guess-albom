import { DB_HOST, DB_PORT, DB_DATABASE, DB_USER, DB_PASSWORD } from '@config';

console.log(DB_HOST, DB_PORT, DB_DATABASE, DB_USER, DB_PASSWORD);

export const dbConnection = {
  url: `mongodb://${DB_HOST}:${DB_PORT}`,
  options: {
    user: DB_USER,
    pass: DB_PASSWORD,
    dbName: DB_DATABASE,
    autoCreate: true,
  },
};
