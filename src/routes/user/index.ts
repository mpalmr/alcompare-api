import type { ApplyRoutes } from '..';
import applyPost from './post';

const userRoutes: ApplyRoutes = function userRoutes(router, deps) {
  applyPost(router, deps);
};

export default userRoutes;
