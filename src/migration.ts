import { dbConnection } from '@/databases';
import { connect, connection } from 'mongoose';
export const bands = [
  {
    name: 'The Beatles',
  },
  {
    name: 'Queen',
  },
  {
    name: 'The Doors',
  },
  {
    name: 'Nirvana',
  },
  {
    name: 'The Who',
  },
  {
    name: 'Led Zeppelin',
  },
  {
    name: 'The Beach Boys',
  },
  {
    name: 'Pink Floyd',
  },
  {
    name: 'The Rolling Stones',
  },
  {
    name: 'The Doors',
  },
];

const connectToDB = async () => {
  await connect(dbConnection.url, dbConnection.options);

  await connection.db.collection('bands').insertMany(bands);

  await connection.close();
};

connectToDB();
