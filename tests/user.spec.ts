import request from 'supertest';
import createKnex, { Knex } from 'knex';
import knexConfig from '../knexfile';
import testServer from './utils/test-server';
import { UUID_PATTERN } from './utils/patterns';

let knex: Knex;

beforeAll(() => {
  knex = createKnex(knexConfig);
});

afterAll(async () => {
  await new Promise<void>((resolve, reject) => {
    knex.destroy((ex: Error) => {
      if (ex) reject(ex);
      else resolve();
    });
  });
});

describe('POST /user', () => {
  test('can create an user', async () => {
    await request(testServer)
      .post('/user')
      .send({
        email: 'test@example.com',
        password: 'P@ssw0rd',
      })
      .expect(201);

    const user = await knex('users').where('email', 'test@example.com');
    expect(user).toHaveLength(1);
    expect(user?.at(0)?.id).toMatch(UUID_PATTERN);
    expect(user?.at(0)?.email).toBe('test@example.com');
    expect(user?.at(0)?.createdAt).toBeInstanceOf(Date);
  });

  // TODO: provide specific error messages in response json for 409 and 400 responses
  test('cannot create an user with the same email', async () => {
    await request(testServer)
      .post('/user')
      .send({
        email: 'test@example.com',
        password: 'P@ssw0rd',
      })
      .expect(409);
  });
  test('cannot create an user with an invalid email', async () => {
    await request(testServer)
      .post('/user')
      .send({
        email: 'literally an invalid email',
        password: 'P@ssw0rd',
      })
      .expect(400);
  });

  test('cannot create a user with a short password', async () => {
    await request(testServer)
      .post('/user')
      .send({
        email: 'test@example.com',
        password: 'shh',
      })
      .expect(400);
  });
});
