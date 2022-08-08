import { Router } from 'express';

import UpdateUserController from '../controllers/UpdateUsersController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const updateUserRouter = Router();
const updateUserController = new UpdateUserController();

updateUserRouter.use(ensureAuthenticated);

updateUserRouter.put('/', updateUserController.update);

export default updateUserRouter;
