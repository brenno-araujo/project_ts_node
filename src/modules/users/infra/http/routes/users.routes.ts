import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import UsersController from '../controllers/UsersController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UserAvatarController from '../controllers/UserAvatarController';
import ShowUserController from '../controllers/ShowUserController';

const usersRouter = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const showUserController = new ShowUserController();

usersRouter.post('/', usersController.create);
usersRouter.get('/', showUserController.show);

usersRouter.patch(
  '/image',
  ensureAuthenticated,
  upload.single('image'),
  userAvatarController.update,
);

export default usersRouter;
