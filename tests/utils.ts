import request from 'supertest';
import createKnex, { Knex } from 'knex';
import knexConfig from '../knexfile';
import createServer from '../src/server';
import createLogger from '../src/logger';

export const testServer = createServer({
  logger: createLogger(),
  knex: createKnex(knexConfig),
});

export async function closeKnex(knex: Knex) {
  await knex.migrate.rollback(undefined, true);
  await knex.migrate.latest();

  return new Promise<void>((resolve, reject) => {
    knex.destroy((ex: Error) => {
      if (ex) reject(ex);
      else resolve();
    });
  });
}

export async function createUser(knex: Knex, email: string, password: string = 'P@ssw0rd') {
  await request(testServer)
    .post('/user')
    .send({ email, password })
    .expect(201);

  return knex('users')
    .where('email', email)
    .select('id')
    .first()
    .then((user) => {
      if (!user) throw new Error('TEST ERROR: User not found');
      return user.id;
    });
}

export const LOCAL_IP = '::ffff:127.0.0.1';

export const UUID_PATTERN = /^[\da-f]{8}-[\da-f]{4}-[4][\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i;
