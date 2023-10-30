require(`dotenv`).config();

const { Pool } = require(`pg`);

/**
 * The method allows to establish the connection to the database
 * @type {Object} object
 * @namespace client
 * @export client
 * @class Pool
 */

const client = new Pool({
  connectionString: `postgres://mamairieV2:mamairieV2@51.75.133.155:5432/mamairieV2`,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Local conenxion
// const client = new Pool({
//   host: process.env.PGHOST,
//   user: process.env.PGUSER,
//   password: process.env.PGPASSWORD,
//   database: process.env.PGDATABASE,
// });

client.connect();

module.exports = client;
