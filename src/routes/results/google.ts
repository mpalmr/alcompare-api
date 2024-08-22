import type { RequestHandler } from 'express';
import { z } from 'zod';
import { validateRequest } from 'zod-express-middleware';
import type { ApplyRoutes } from '..';

interface ReqBody {
  userId: string;
  query: string;
  items: {
    url: string;
    title: string;
    description: string;
  }[];
}

const resultsGoogleRoute: ApplyRoutes = function resultsGoogleRoute(router, { knex }) {
  router.post(
    '/results/google',

    validateRequest({
      body: z.object({
        userId: z.string().uuid(),
        query: z.string().max(2048),
        items: z.array(z.object({
          url: z.string().min(3).max(2048),
          title: z.string().min(1),
          description: z.string().min(1),
        })),
      }),
    }),

    (async (req, res) => {
      const { items, ...result } = req.body;

      await knex.transaction(async (trx) => {
        const resultId = await trx('resultsGoogle')
          .insert({
            ...result,
            ip: req.ip!, // TODO: Why is this potentially undefined?
          })
          .returning('id')
          .then(([{ id }]) => id);

        return trx('resultsGoogleItems').insert(items.map((item) => ({
          ...item,
          resultId,
        })));
      });

      res.sendStatus(201);
    }) as RequestHandler<{}, void, ReqBody>,
  );
};

export default resultsGoogleRoute;
