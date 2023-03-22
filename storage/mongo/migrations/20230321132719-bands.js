// module.exports = {
//   async up(db) {
//     // TODO write your migration here.
//     // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
//     // Example:
//     await db.collection('bands').insertMany([{ name: 'The Beatles' }], { $set: { blacklisted: true } });
//   },
//   // async down(db, client) {
//   // TODO write the statements to rollback your migration (if possible)
//   // Example:
//   // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
//   // }
// };

exports.up = function (db, next) {
  var bands = db.Collection('bands');
  bands.insertMany([{ name: 'The Beatels' }], next);
};
