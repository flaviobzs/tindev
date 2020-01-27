import { Router } from 'express';

import DevController from './app/controllers/DevController';
import LikeController from './app/controllers/LikeController';
import DeslikeController from './app/controllers/DeslikeController';

const routes = Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.post('/devs/:devId/likes', LikeController.store);
routes.post('/devs/:devId/dislikes', DeslikeController.store);

export default routes;
