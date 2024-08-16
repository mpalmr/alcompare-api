import createKnex from 'knex';
import knexConfig from '../knexfile';
import createServer from '../src/server';
import createLogger from '../src/logger';

export default createServer({
  logger: createLogger(),
  knex: createKnex(knexConfig),
});
