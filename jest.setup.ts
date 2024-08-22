import createKnex from 'knex';
import knexConfig from './knexfile';
import { closeKnex } from './tests/utils';

beforeAll(() => closeKnex(createKnex(knexConfig)));
