import request from 'supertest';
import createKnex, { Knex } from 'knex';
import knexConfig from '../knexfile';
import { testServer, closeKnex, UUID_PATTERN } from './utils';

let knex: Knex;

beforeAll(() => {
  knex = createKnex(knexConfig);
});

afterAll(() => closeKnex(knex));

describe('POST /user', () => {
  test('can create an user', async () => {
    await request(testServer)
      .post('/user')
      .send({
        email: 'test@example.com',
        password: 'P@ssw0rd',
      })
      .expect(201);

    expect(await knex('users').where('email', 'test@example.com')).toEqual([{
      id: expect.stringMatching(UUID_PATTERN),
      email: 'test@example.com',
      passwordHash: expect.any(String),
      createdAt: expect.any(Date),
    }]);
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
