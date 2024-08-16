import type { RequestHandler } from 'express';
import { z } from 'zod';
import { validateRequest } from 'zod-express-middleware';
import argon from 'argon2';
import type { ApplyRoutes } from '..';

interface ReqBody {
  email: string;
  password: string;
}

const postUserRoute: ApplyRoutes = function postUserRoute(router, { knex }) {
  router.post(
    '/user',

    validateRequest({
      body: z.object({
        email: z.string().email().trim(),
        password: z.string().min(8),
      }),
    }),

    (async (req, res) => {
      const exists = await knex('users')
        .where('email', req.body.email)
        .first()
        .then(Boolean);

      if (exists) res.sendStatus(409);
      else {
        await knex('users').insert({
          email: req.body.email,
          passwordHash: await argon.hash(req.body.password),
        });

        res.sendStatus(201);
      }
    }) as RequestHandler<{}, void, ReqBody>,
  );
};

export default postUserRoute;
