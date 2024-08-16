import express, { ErrorRequestHandler } from 'express';
import { loggers, type Logger } from 'winston';
import type { Knex } from 'knex';
import router from './routes';
import { NODE_ENV } from './env';

export interface ServerDeps {
  logger: Logger;
  knex: Knex;
}

export default function createServer(deps: ServerDeps) {
  const { logger } = deps;

  const server = express();
  server.use(router(deps));

  // If request does not match any routes respond with 404
  server.use((req, res) => {
    res.sendStatus(404);
  });

  // Default error handler
  server.use(((ex, req, res, next) => {
    logger.error('Unhandled error:', ex);
    if (res.headersSent) next(ex);
    else if (NODE_ENV === 'production') res.sendStatus(500);
    else res.status(500).json(ex);
  }) as ErrorRequestHandler);

  return server;
}
