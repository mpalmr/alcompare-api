import type { ApplyRoutes } from '..';
import applyGoogle from './google';

const resultsRoutes: ApplyRoutes = function resultsRoutes(router, deps) {
  applyGoogle(router, deps);
};

export default resultsRoutes;
