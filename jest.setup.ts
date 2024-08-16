import createKnex from 'knex';
import knexConfig from './knexfile';
import { closeKnex } from './tests/utils';

beforeAll(async () => {
  const knex = createKnex(knexConfig);

  // Reset psql
  await knex.migrate.rollback(undefined, true);
  await knex.migrate.latest();

  await closeKnex(knex);
});
