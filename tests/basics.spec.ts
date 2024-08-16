import request from 'supertest';
import { testServer } from './utils';

test('unknown paths respond with 404', async () => {
  await request(testServer)
    .get('/asdf/not/a/real/path')
    .expect(404);
});

// TODO: 500 error test
