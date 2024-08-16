import createKnex, { Knex } from 'knex';
import knexConfig from '../knexfile';
import createServer from '../src/server';
import createLogger from '../src/logger';

export const testServer = createServer({
  logger: createLogger(),
  knex: createKnex(knexConfig),
});

export function closeKnex(knex: Knex) {
  return new Promise<void>((resolve, reject) => {
    knex.destroy((ex: Error) => {
      if (ex) reject(ex);
      else resolve();
    });
  });
}

export const UUID_PATTERN = /^[\da-f]{8}-[\da-f]{4}-[4][\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i;
