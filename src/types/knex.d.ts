import type { Knex } from 'knex';

declare module 'knex/types/tables' {
  interface UserRecord {
    readonly id: string;
    readonly email: string;
    passwordHash: string;
    readonly createdAt: Date;
  }

  interface ResultsGoogleRecord {
    readonly id: string;
    readonly userId: string;
    query: string;
    ip: string;
    readonly createdAt: Date;
  }

  interface ResultsGoogleItemRecord {
    readonly id: string;
    readonly resultId: string;
    url: string;
    title: string;
    description: string;
  }

  interface Tables {
    users: Knex.CompositeTableType<
    UserRecord,
    Omit<UserRecord, 'id' | 'createdAt'>,
    Partial<Omit<UserRecord, 'id' | 'email' | 'createdAt'>>,
    >;

    resultsGoogle: Knex.CompositeTableType<
    ResultsGoogleRecord,
    Omit<ResultsGoogleRecord, 'id' | 'createdAt'>,
    Partial<Omit<ResultsGoogleRecord, 'id' | 'userId' | 'createdAt'>>,
    >;

    resultsGoogleItems: Knex.CompositeTableType<
    ResultsGoogleItemRecord,
    Omit<ResultsGoogleItemRecord, 'id'>,
    Partial<Omit<ResultsGoogleItemRecord, 'id' | 'resultId'>>,
    >;
  }
}
