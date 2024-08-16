import createKnex from 'knex';
import knexConfig from '../knexfile';
import createLogger from './logger';
import createServer from './server';
import { HTTP_PORT } from './env';

const logger = createLogger();
const server = createServer({
  logger,
  knex: createKnex(knexConfig),
});

server.listen(HTTP_PORT, () => {
  logger.info(`alcompare API @ http://localhost:${HTTP_PORT}/`);
});
