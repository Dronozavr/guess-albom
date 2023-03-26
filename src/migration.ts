import { dbConnection } from '@/databases';
import { connect, connection } from 'mongoose';
export const bands = [
  {
    name: 'Hang Massive',
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
    name: 'G Unit',
  },
  {
    name: 'Asher',
  },
  {
    name: 'The Beach Boys',
  },
  {
    name: 'Pink Floyd',
  },
  {
    name: 'Snoop Dog',
  },
  {
    name: 'Obie Trice',
  },
];

const connectToDB = async () => {
  await connect(dbConnection.url, dbConnection.options);

  await connection.db.collection('bands').insertMany(bands);

  await connection.close();
};

connectToDB();
