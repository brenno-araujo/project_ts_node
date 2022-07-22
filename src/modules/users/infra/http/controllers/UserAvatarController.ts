import UpdateUserImageService from '@modules/users/services/UpdateUserImageService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserImageService = container.resolve(UpdateUserImageService);

    const user = await updateUserImageService.execute({
      user_id: request.user.id,
      image: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  }
}
