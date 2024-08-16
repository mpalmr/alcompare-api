'use strict';

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.ts',
  ],
  testMatch: [
    '<rootDir>/tests/**/*.spec.ts',
    '<rootDir>/**/__tests__/**/*.test.ts',
  ],
};
