import request from 'supertest';
import testServer from './utils/test-server';

test('unknown paths respond with 404', () => request(testServer)
  .get('/asdf/not/a/real/path')
  .expect(404));

// TODO: 500 error test
