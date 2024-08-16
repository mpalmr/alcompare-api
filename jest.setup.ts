import createKnex from 'knex';
import knexConfig from './knexfile';

beforeAll(async () => {
  const knex = createKnex(knexConfig);

  // Reset psql
  await knex.migrate.rollback(undefined, true);
  await knex.migrate.latest();

  // Close DB connection
  await new Promise<void>((resolve, reject) => {
    knex.destroy((ex: Error) => {
      if (ex) reject(ex);
      else resolve();
    });
  });
});
