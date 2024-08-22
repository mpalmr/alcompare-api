import request from 'supertest';
import createKnex, { Knex } from 'knex';
import knexConfig from '../../knexfile';
import {
  testServer,
  closeKnex,
  createUser,
  LOCAL_IP,
  UUID_PATTERN,
} from '../utils';

let knex: Knex;

beforeAll(() => {
  knex = createKnex(knexConfig);
});

afterAll(() => closeKnex(knex));

describe('POST /results/google', () => {
  let userId: string;

  beforeAll(async () => {
    userId = await createUser(knex, 'results-google@example.com');
  });

  test('can create a google result', async () => {
    await request(testServer)
      .post('/results/google')
      .send({
        userId,
        query: 'buy hot choColate cIgarettes online',
        items: [
          {
            url: 'https://example.com/best-chocolate-cigarettes',
            title: 'Best Chocolate Cigarettes',
            description: 'A list of the best chocolate cigarettes.',
          },
          {
            url: 'https://example.com/fine-chocolate-cigarettes',
            title: 'Only the Finest Chocolate Cigarettes Here',
            description: 'You fancy enough bro?',
          },
        ],
      })
      .expect(201);

    const resultRows = await knex('resultsGoogle').where('userId', userId);
    expect(resultRows).toEqual([{
      id: expect.stringMatching(UUID_PATTERN),
      userId,
      query: 'buy hot choColate cIgarettes online',
      ip: LOCAL_IP,
      createdAt: expect.any(Date),
    }]);

    const resultId = resultRows!.at(0)!.id;
    await expect(knex('resultsGoogleItems').where('resultId', resultId)).resolves.toEqual([
      {
        resultId,
        id: expect.stringMatching(UUID_PATTERN),
        url: 'https://example.com/best-chocolate-cigarettes',
        title: 'Best Chocolate Cigarettes',
        description: 'A list of the best chocolate cigarettes.',
      },
      {
        resultId,
        id: expect.stringMatching(UUID_PATTERN),
        url: 'https://example.com/fine-chocolate-cigarettes',
        title: 'Only the Finest Chocolate Cigarettes Here',
        description: 'You fancy enough bro?',
      },
    ]);
  });

  test('items array cannot be empty', async () => {
    await request(testServer)
      .post('/results/google')
      .send({
        userId,
        query: 'buy hot choColate cIgarettes online',
        items: [],
      })
      .expect(400);
  });
});
