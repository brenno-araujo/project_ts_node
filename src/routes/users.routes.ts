import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import UpdateUserImageService from '../services/UpdateUserImageService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  } catch (error) {
    return response.status(400).json({ error: (error as Error).message });
  }
});

usersRouter.patch(
  '/image',
  ensureAuthenticated,
  upload.single('image'),
  async (request, response) => {
    try {
      const updateUserImageService = new UpdateUserImageService();

      const user = await updateUserImageService.execute({
        user_id: request.user.id,
        image: request.file.filename,
      });

      delete user.password;

      return response.json(user);
    } catch (error) {
      return response.status(400).json({ error: (error as Error).message });
    }
  },
);

export default usersRouter;
