import express, { Router as ExpressRouter } from 'express';
import Router from 'express-promise-router';
import type { ServerDeps } from '../server';
import applyUser from './user';

type RouteDeps = ServerDeps;
export type ApplyRoutes = (router: ExpressRouter, deps: RouteDeps) => void;

export default function createRouter(deps: RouteDeps) {
  const router = Router();
  router.use(express.json());

  applyUser(router, deps);

  return router;
}
