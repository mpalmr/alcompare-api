import type { Knex } from 'knex';

type WriteOmit<T> = Omit<T, 'id' | 'createdAt'>;

declare module 'knex/types/tables' {
  interface UserRecord {
    readonly id: string;
    readonly email: string;
    passwordHash: string;
    readonly createdAt: Date;
  }

  interface Tables {
    users: Knex.CompositeTableType<
    UserRecord,
    WriteOmit<UserRecord>,
    Partial<Omit<WriteOmit<UserRecord>, 'email'>>,
    >;
  }
}
