import express, { Router } from 'express';
import type { ServerDeps } from '../server';

export default function createRouter(deps: ServerDeps) {
  const router = Router();
  router.use(express.json());
  return router;
}
